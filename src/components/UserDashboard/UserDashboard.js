import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TaskContext } from '../../context/TaskContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext);
  
  if (!currentUser) return null;
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = tasks.length - completedTasks;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  
  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard">
        <div className="user-info">
          <h2>Welcome, {currentUser.displayName || 'User'}!</h2>
          <p className="user-email">{currentUser.email}</p>
        </div>
        
        <div className="task-stats">
          <div className="stat-item">
            <span className="stat-value">{tasks.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{activeTasks}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{completionRate}%</span>
            <span className="stat-label">Completion Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;