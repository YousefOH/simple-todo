import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import HomePage from './pages/HomePage.js';
import AboutPage from './pages/AboutPage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import { TaskProvider } from './context/TaskContext.js';
import { AuthProvider } from './context/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected Routes with TaskProvider */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={
                <TaskProvider>
                  <HomePage />
                </TaskProvider>
              } />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;