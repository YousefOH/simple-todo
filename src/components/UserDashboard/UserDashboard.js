import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TaskContext } from '../../context/TaskContext';
import UserProfile from '../UserProfile/UserProfile';
import './UserDashboard.css';

const UserDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { tasks, loading } = useContext(TaskContext);
  const [showProfile, setShowProfile] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    completionRate: 0
  });
  
  // Calculate stats whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      const completedTasks = tasks.filter(task => task.completed).length;
      const activeTasks = tasks.length - completedTasks;
      const completionRate = Math.round((completedTasks / tasks.length) * 100);
      
      setStats({
        total: tasks.length,
        active: activeTasks,
        completed: completedTasks,
        completionRate: completionRate
      });
    } else {
      setStats({
        total: 0,
        active: 0,
        completed: 0,
        completionRate: 0
      });
    }
  }, [tasks]);
  
  if (!currentUser) return null;
  
  return (
    <div className="user-dashboard-container">
      {showProfile ? (
        <UserProfile />
      ) : (
        <div className="user-dashboard">
          <div className="user-info">
            <h2>Welcome, {currentUser.displayName || 'User'}!</h2>
            <p className="user-email">{currentUser.email}</p>
            <button 
              className="view-profile-btn"
              onClick={() => setShowProfile(true)}
            >
              View Profile
            </button>
          </div>
          
          <div className="task-stats">
            <div className={`stat-item ${loading ? 'stat-loading' : ''}`}>
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total Tasks</span>
            </div>
            <div className={`stat-item ${loading ? 'stat-loading' : ''}`}>
              <span className="stat-value">{stats.active}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className={`stat-item ${loading ? 'stat-loading' : ''}`}>
              <span className="stat-value">{stats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className={`stat-item ${loading ? 'stat-loading' : ''}`}>
              <span className="stat-value">{stats.completionRate}%</span>
              <span className="stat-label">Completion Rate</span>
            </div>
          </div>
          
          {loading && (
            <div className="sync-indicator">
              <div className="sync-spinner"></div>
              <span>Syncing with cloud...</span>
            </div>
          )}
        </div>
      )}
      
      {showProfile && (
        <button 
          className="back-btn"
          onClick={() => setShowProfile(false)}
        >
          &larr; Back to Dashboard
        </button>
      )}
    </div>
  );
};

export default UserDashboard;