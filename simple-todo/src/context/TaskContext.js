import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { 
  ref, 
  set, 
  push,
  onValue, 
  update, 
  remove,
  query,
  orderByChild,
  equalTo,
  get
} from 'firebase/database';
import { database } from '../firebase';
import { AuthContext } from './AuthContext';

// Create context
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Get current user from AuthContext
  const { currentUser } = useContext(AuthContext);
  
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set up real-time listener for tasks
  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return () => {};
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Reference to the user's tasks in the database
      const userTasksRef = ref(database, `tasks/${currentUser.uid}`);
      
      // Set up real-time listener
      const unsubscribe = onValue(userTasksRef, (snapshot) => {
        const data = snapshot.val();
        const taskList = [];
        
        if (data) {
          // Convert the object of tasks to an array
          Object.keys(data).forEach(key => {
            taskList.push({
              id: key,
              ...data[key]
            });
          });
          
          // Sort tasks by createdAt (newest first)
          taskList.sort((a, b) => b.createdAt - a.createdAt);
        }
        
        setTasks(taskList);
        setLoading(false);
      }, (error) => {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks. Please try again.');
        setLoading(false);
      });
      
      // Clean up listener on unmount
      return () => {
        // No need to call unsubscribe directly with the Realtime Database
        // The onValue function doesn't return an unsubscribe function like Firestore
      };
    } catch (err) {
      console.error('Error setting up task listener:', err);
      setError('Failed to connect to the database. Please try again.');
      setLoading(false);
      return () => {};
    }
  }, [currentUser]);

  // Manual fetch for when real-time updates fail
  const fetchTasks = useCallback(async () => {
    if (!currentUser) {
      setTasks([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Reference to the user's tasks in the database
      const userTasksRef = ref(database, `tasks/${currentUser.uid}`);
      
      // Get the data once
      const snapshot = await get(userTasksRef);
      const data = snapshot.val();
      const taskList = [];
      
      if (data) {
        // Convert the object of tasks to an array
        Object.keys(data).forEach(key => {
          taskList.push({
            id: key,
            ...data[key]
          });
        });
        
        // Sort tasks by createdAt (newest first)
        taskList.sort((a, b) => b.createdAt - a.createdAt);
      }
      
      setTasks(taskList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Please try again.');
      setLoading(false);
    }
  }, [currentUser]);

  // Filter tasks based on current filter
  useEffect(() => {
    const filterTasks = () => {
      switch (filter) {
        case 'completed':
          setFilteredTasks(tasks.filter(task => task.completed));
          break;
        case 'active':
          setFilteredTasks(tasks.filter(task => !task.completed));
          break;
        default:
          setFilteredTasks(tasks);
      }
    };

    filterTasks();
  }, [tasks, filter]);

  // Add new task
  const addTask = useCallback(async (taskTitle) => {
    if (!taskTitle.trim() || !currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Reference to the user's tasks in the database
      const userTasksRef = ref(database, `tasks/${currentUser.uid}`);
      
      // Create a new task with a unique key
      const newTaskRef = push(userTasksRef);
      
      const newTask = {
        title: taskTitle.trim(),
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      // Set the data at the new reference
      await set(newTaskRef, newTask);
      
      setLoading(false);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please try again.');
      setLoading(false);
    }
  }, [currentUser]);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    if (!currentUser) return;
    
    try {
      // Reference to the specific task
      const taskRef = ref(database, `tasks/${currentUser.uid}/${id}`);
      
      // Remove the task
      await remove(taskRef);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  }, [currentUser]);

  // Toggle task completion
  const toggleComplete = useCallback(async (id) => {
    if (!currentUser) return;
    
    try {
      // Find the task
      const taskToUpdate = tasks.find(task => task.id === id);
      if (!taskToUpdate) return;
      
      // Reference to the specific task
      const taskRef = ref(database, `tasks/${currentUser.uid}/${id}`);
      
      // Update the task
      await update(taskRef, {
        completed: !taskToUpdate.completed,
        updatedAt: Date.now()
      });
    } catch (err) {
      console.error('Error toggling task completion:', err);
      setError('Failed to update task. Please try again.');
    }
  }, [currentUser, tasks]);

  // Edit task
  const editTask = useCallback(async (id, newTitle) => {
    if (!newTitle.trim() || !currentUser) return;
    
    try {
      // Reference to the specific task
      const taskRef = ref(database, `tasks/${currentUser.uid}/${id}`);
      
      // Update the task
      await update(taskRef, {
        title: newTitle.trim(),
        updatedAt: Date.now()
      });
    } catch (err) {
      console.error('Error editing task:', err);
      setError('Failed to edit task. Please try again.');
    }
  }, [currentUser]);

  // Change current filter
  const changeFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  // Clear all completed tasks
  const clearCompleted = useCallback(async () => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get all completed tasks
      const completedTasks = tasks.filter(task => task.completed);
      
      // Delete each completed task
      const deletePromises = completedTasks.map(task => {
        const taskRef = ref(database, `tasks/${currentUser.uid}/${task.id}`);
        return remove(taskRef);
      });
      
      await Promise.all(deletePromises);
      setLoading(false);
    } catch (err) {
      console.error('Error clearing completed tasks:', err);
      setError('Failed to clear completed tasks. Please try again.');
      setLoading(false);
    }
  }, [currentUser, tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filter,
        loading,
        error,
        addTask,
        deleteTask,
        toggleComplete,
        editTask,
        changeFilter,
        fetchTasks,
        clearCompleted
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};