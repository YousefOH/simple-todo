import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create context
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const loadTasks = () => {
      try {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        setError('Failed to load tasks from storage');
      }
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
  const addTask = useCallback((taskTitle) => {
    if (!taskTitle.trim()) return;
    
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  // Delete task
  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  // Toggle task completion
  const toggleComplete = useCallback((id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // Edit task
  const editTask = useCallback((id, newTitle) => {
    if (!newTitle.trim()) return;
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, title: newTitle.trim() } : task
      )
    );
  }, []);

  // Change current filter
  const changeFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  // Simulate fetching tasks from an API
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would be an actual API call
      const storedTasks = localStorage.getItem('tasks');
      const data = storedTasks ? JSON.parse(storedTasks) : [];
      
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
      setLoading(false);
    }
  }, []);

  // Clear all completed tasks
  const clearCompleted = useCallback(() => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  }, []);

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