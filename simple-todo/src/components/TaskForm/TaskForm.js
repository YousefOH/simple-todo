import React, { useState, useContext, useRef, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { AuthContext } from '../../context/AuthContext';
import './TaskForm.css';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTask, loading } = useContext(TaskContext);
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!currentUser) {
      setError('You must be logged in to add tasks');
      return;
    }
    
    // Form validation
    if (task.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    
    if (task.trim().length < 3) {
      setError('Task must be at least 3 characters');
      return;
    }
    
    if (task.trim().length > 100) {
      setError('Task cannot be more than 100 characters');
      return;
    }
    
    try {
      setIsSubmitting(true);
      // Add task to Firebase
      await addTask(task);
      
      // Reset form
      setTask('');
      setError('');
      
      // Focus input for quick multiple entries
      inputRef.current.focus();
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Add task error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setTask(e.target.value);
    if (error) setError('');
  };

  const handleKeyDown = (e) => {
    // Clear error when user starts typing after an error
    if (error && e.key !== 'Enter') {
      setError('');
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-control">
          <label htmlFor="task" className="visually-hidden">Add a new task</label>
          <input
            type="text"
            id="task"
            ref={inputRef}
            placeholder="Add a new task..."
            value={task}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "task-error" : undefined}
            className={error ? "input-error" : ""}
            disabled={!currentUser || isSubmitting || loading}
          />
          {error && (
            <div id="task-error" className="error-message" aria-live="polite">
              {error}
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className={`btn add-btn ${isSubmitting ? 'btn-loading' : ''}`}
          aria-label="Add task"
          disabled={!currentUser || isSubmitting || loading}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;