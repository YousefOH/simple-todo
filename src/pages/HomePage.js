import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';
import UserDashboard from '../components/UserDashboard/UserDashboard.js';
import './HomePage.css';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { tasks, changeFilter, filter, clearCompleted } = useContext(TaskContext);
  
  // Count completed tasks
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <div className="home-page">
      <UserDashboard />
      
      <div className="task-container">
        <div className="task-header">
          <h1>My Tasks</h1>
          {currentUser && tasks.length > 0 && (
            <div className="filter-controls">
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => changeFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                  onClick={() => changeFilter('active')}
                >
                  Active
                </button>
                <button 
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => changeFilter('completed')}
                >
                  Completed
                </button>
              </div>
              
              {completedCount > 0 && (
                <button 
                  className="clear-completed-btn"
                  onClick={clearCompleted}
                  aria-label="Clear all completed tasks"
                >
                  Clear completed ({completedCount})
                </button>
              )}
            </div>
          )}
        </div>
        
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default HomePage;