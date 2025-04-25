import React from 'react';
import TaskForm from '../components/TaskForm/TaskForm.js';
import TaskList from '../components/TaskList/TaskList.js';
import TaskFilter from '../components/TaskFilter/TaskFilter.js';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="intro-section">
        <h1>Manage Your Tasks</h1>
        <p>
          A simple and intuitive way to keep track of your daily tasks.
          Add, complete, and filter your tasks to stay organized and productive.
        </p>
      </section>
      
      <section className="main-section">
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </section>
    </div>
  );
};

export default HomePage;