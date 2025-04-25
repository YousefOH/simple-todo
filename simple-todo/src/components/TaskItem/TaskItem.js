import React, { useState, useContext, useRef, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, editTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const editInputRef = useRef(null);

  useEffect(() => {
    // Focus on input when editing starts
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggleComplete = () => {
    toggleComplete(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditedTitle(task.title);
  };

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    if (editedTitle.trim() !== '') {
      editTask(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
  };

  const handleKeyDown = (e) => {
    // Cancel on Escape key
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // Format creation date to be more readable
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            ref={editInputRef}
            value={editedTitle}
            onChange={handleEditChange}
            onKeyDown={handleKeyDown}
            className="edit-input"
            aria-label="Edit task"
          />
          <div className="edit-actions">
            <button type="submit" className="btn btn-sm" aria-label="Save changes">
              Save
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-danger" 
              onClick={handleEditCancel}
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-content">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              <span className="checkmark"></span>
            </label>
            
            <div className="task-details">
              <p className="task-title">{task.title}</p>
              <time className="task-date" dateTime={task.createdAt}>
                Created: {formatDate(task.createdAt)}
              </time>
            </div>
          </div>
          
          <div className="task-actions">
            <button 
              className="action-btn edit-btn" 
              onClick={handleEditStart}
              aria-label="Edit task"
              disabled={task.completed}
            >
              Edit
            </button>
            <button 
              className="action-btn delete-btn" 
              onClick={handleDelete}
              aria-label="Delete task"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;