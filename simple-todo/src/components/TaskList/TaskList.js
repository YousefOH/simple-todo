import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { AuthContext } from '../../context/AuthContext';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

const TaskList = () => {
  const { filteredTasks, loading, error, filter, fetchTasks } = useContext(TaskContext);
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    // Only fetch tasks if user is authenticated
    if (currentUser) {
      fetchTasks();
    }
  }, [currentUser, fetchTasks]);
  
  // Show loading message when tasks are being fetched
  if (loading) {
    return (
      <div className="task-list-container loading" aria-live="polite">
        <div className="loader"></div>
        <p>Loading your tasks from the cloud...</p>
      </div>
    );
  }
  
  // Show error message if there was an error fetching tasks
  if (error) {
    return (
      <div className="task-list-container error" aria-live="assertive">
        <p className="error-message">{error}</p>
        <button className="btn" onClick={fetchTasks}>Try Again</button>
      </div>
    );
  }
  
  // If there are no tasks or the user is not authenticated
  if (!currentUser) {
    return (
      <div className="task-list-container empty" aria-live="polite">
        <p className="empty-message">
          Please log in to see your tasks.
        </p>
      </div>
    );
  }
  
  // Show appropriate message when filter is applied but no tasks match
  if (filteredTasks.length === 0) {
    return (
      <div className="task-list-container empty" aria-live="polite">
        <p className="empty-message">
          {filter === 'all' 
            ? `Welcome, ${currentUser.displayName || 'User'}! Your task list is empty. Add a new task to get started!`
            : filter === 'active' 
              ? "No active tasks. Great job!"
              : "No completed tasks yet. Complete a task to see it here!"}
        </p>
      </div>
    );
  }
  
  return (
    <div className="task-list-container">
      <h2 className="list-title">
        {filter === 'all' 
          ? 'All Tasks' 
          : filter === 'active' 
            ? 'Active Tasks' 
            : 'Completed Tasks'}
        <span className="task-count">({filteredTasks.length})</span>
      </h2>
      
      <ul className="task-list" aria-label={`${filter} tasks`}>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;