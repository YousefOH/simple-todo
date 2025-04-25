import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

const TaskList = () => {
  const { filteredTasks, loading, error, filter, fetchTasks } = useContext(TaskContext);
  
  useEffect(() => {
    // Fetch tasks on initial load
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (loading) {
    return (
      <div className="task-list-container loading" aria-live="polite">
        <div className="loader"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="task-list-container error" aria-live="assertive">
        <p className="error-message">{error}</p>
        <button className="btn" onClick={fetchTasks}>Try Again</button>
      </div>
    );
  }
  
  if (filteredTasks.length === 0) {
    return (
      <div className="task-list-container empty" aria-live="polite">
        <p className="empty-message">
          {filter === 'all' 
            ? "Your task list is empty. Add a new task to get started!"
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