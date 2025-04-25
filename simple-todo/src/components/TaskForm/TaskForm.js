import React, { useState, useContext, useRef, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import './TaskForm.css';

const TaskForm = () => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useContext(TaskContext);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    
    // Add task
    addTask(task);
    
    // Reset form
    setTask('');
    setError('');
    
    // Focus input for quick multiple entries
    inputRef.current.focus();
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
          />
          {error && (
            <div id="task-error" className="error-message" aria-live="polite">
              {error}
            </div>
          )}
        </div>
        <button type="submit" className="btn add-btn" aria-label="Add task">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;