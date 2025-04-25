import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Get user display name from Firebase user object
  const displayName = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : 'User';
  
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo" aria-label="Home">
          <h1>TaskMaster</h1>
        </Link>
        
        <nav className="nav">
          <ul className="nav-list">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item user-menu">
                  <span className="user-greeting">Hi, {displayName}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/register" 
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;