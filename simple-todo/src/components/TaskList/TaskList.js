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
  
  // If user is not authenticated
  if (!currentUser) {
    return (
      <div className="task-list-container empty" aria-live="polite">
        <p className="empty-message">
          Please log in to see your tasks.
        </p>
      </div>
    );
  }
  
  // Show appropriate message when no tasks exist or filter returns no results
  if (filteredTasks.length === 0) {
    const emptyMessages = {
      all: `
        <div class="empty-tasks-container">
          <div class="empty-tasks-icon">📋</div>
          <h3>No Tasks Found</h3>
          <p>You don't have any tasks yet. Add your first task to get started!</p>
        </div>
      `,
      active: `
        <div class="empty-tasks-container">
          <div class="empty-tasks-icon">✅</div>
          <h3>All Tasks Complete!</h3>
          <p>You have no active tasks. Great job!</p>
        </div>
      `,
      completed: `
        <div class="empty-tasks-container">
          <div class="empty-tasks-icon">🏆</div>
          <h3>No Completed Tasks</h3>
          <p>You haven't completed any tasks yet. Mark a task as complete to see it here.</p>
        </div>
      `
    };
    
    return (
      <div className="task-list-container empty" aria-live="polite">
        <div 
          className="empty-message"
          dangerouslySetInnerHTML={{ __html: emptyMessages[filter] }}
        />
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