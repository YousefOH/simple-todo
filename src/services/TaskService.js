// This is a mock service that simulates API calls
// In a real application, this would interact with a backend server

// Simulate network delay for more realistic API call emulation
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const STORAGE_KEY = 'tasks';

// Utility to get mock error based on probability
const getMockError = (probability = 0.05) => {
  return Math.random() < probability;
};

// Get all tasks
export const getTasks = async () => {
  try {
    // Simulate network delay
    await delay(800);
    
    // Simulate random error
    if (getMockError()) {
      throw new Error('Network error: Could not fetch tasks');
    }
    
    // Get tasks from localStorage
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Add a new task
export const addTask = async (taskTitle) => {
  try {
    await delay(500);
    
    if (getMockError()) {
      throw new Error('Network error: Could not add task');
    }
    
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    // Get existing tasks
    const existingTasks = await getTasks();
    
    // Save updated tasks
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await delay(500);
    
    if (getMockError()) {
      throw new Error('Network error: Could not delete task');
    }
    
    const existingTasks = await getTasks();
    const updatedTasks = existingTasks.filter(task => task.id !== id);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    
    return { id };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Toggle task completion status
export const toggleTaskComplete = async (id) => {
  try {
    await delay(300);
    
    if (getMockError()) {
      throw new Error('Network error: Could not update task');
    }
    
    const existingTasks = await getTasks();
    const updatedTasks = existingTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    
    return updatedTasks.find(task => task.id === id);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Edit task title
export const editTask = async (id, newTitle) => {
  try {
    await delay(500);
    
    if (getMockError()) {
      throw new Error('Network error: Could not edit task');
    }
    
    const existingTasks = await getTasks();
    const updatedTasks = existingTasks.map(task => 
      task.id === id ? { ...task, title: newTitle.trim() } : task
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    
    return updatedTasks.find(task => task.id === id);
  } catch (error) {
    console.error('Error editing task:', error);
    throw error;
  }
};

// Clear all completed tasks
export const clearCompletedTasks = async () => {
  try {
    await delay(600);
    
    if (getMockError()) {
      throw new Error('Network error: Could not clear completed tasks');
    }
    
    const existingTasks = await getTasks();
    const updatedTasks = existingTasks.filter(task => !task.completed);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    
    return { success: true };
  } catch (error) {
    console.error('Error clearing completed tasks:', error);
    throw error;
  }
};