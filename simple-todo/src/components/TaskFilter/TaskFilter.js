import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import './TaskFilter.css';

const TaskFilter = () => {
  const { filter, changeFilter, tasks, clearCompleted } = useContext(TaskContext);
  
  const handleFilterChange = (newFilter) => {
    changeFilter(newFilter);
  };

  // Calculate counts for the filter badges
  const totalCount = tasks.length;
  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
          aria-pressed={filter === 'all'}
        >
          All <span className="count-badge">{totalCount}</span>
        </button>
        
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => handleFilterChange('active')}
          aria-pressed={filter === 'active'}
        >
          Active <span className="count-badge">{activeCount}</span>
        </button>
        
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
          aria-pressed={filter === 'completed'}
        >
          Completed <span className="count-badge">{completedCount}</span>
        </button>
      </div>
      
      {completedCount > 0 && (
        <button 
          className="clear-completed-btn"
          onClick={clearCompleted}
          aria-label="Clear all completed tasks"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default TaskFilter;