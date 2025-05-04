import React, { useState, useContext, useRef, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, editTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const editInputRef = useRef(null);

  useEffect(() => {
    // Focus on input when editing starts
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggleComplete = async () => {
    try {
      setIsToggling(true);
      await toggleComplete(task.id);
    } catch (error) {
      console.error('Error toggling task:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTask(task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
      setIsDeleting(false);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditedTitle(task.title);
  };

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (editedTitle.trim() !== '') {
      try {
        setIsUpdating(true);
        await editTask(task.id, editedTitle);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating task:', error);
      } finally {
        setIsUpdating(false);
      }
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

  // Format creation date from timestamp to readable format
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    
    const date = new Date(timestamp);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString(undefined, options);
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
            disabled={isUpdating}
          />
          <div className="edit-actions">
            <button 
              type="submit" 
              className={`btn btn-sm ${isUpdating ? 'btn-loading' : ''}`} 
              aria-label="Save changes"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button 
              type="button" 
              className="btn btn-sm btn-danger" 
              onClick={handleEditCancel}
              aria-label="Cancel editing"
              disabled={isUpdating}
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
                disabled={isToggling}
                aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              <span className={`checkmark ${isToggling ? 'checkmark-loading' : ''}`}></span>
            </label>
            
            <div className="task-details">
              <p className="task-title">{task.title}</p>
              <time className="task-date" dateTime={new Date(task.createdAt).toISOString()}>
                Created: {formatDate(task.createdAt)}
              </time>
            </div>
          </div>
          
          <div className="task-actions">
            <button 
              className="action-btn edit-btn" 
              onClick={handleEditStart}
              aria-label="Edit task"
              disabled={task.completed || isDeleting || isToggling}
            >
              Edit
            </button>
            <button 
              className={`action-btn delete-btn ${isDeleting ? 'delete-btn-loading' : ''}`}
              onClick={handleDelete}
              aria-label="Delete task"
              disabled={isDeleting || isToggling}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;