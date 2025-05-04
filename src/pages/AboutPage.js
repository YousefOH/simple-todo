import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About TaskMaster</h1>
      
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          TaskMaster aims to simplify task management by providing an intuitive, 
          streamlined web app where users can easily add, organize, and track their 
          to-do items without unnecessary complexity.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Problem Statement</h2>
        <p>
          Modern life is fast-paced, and many individuals struggle to keep track
          of their daily tasks, deadlines, and priorities. Traditional methods
          (like pen and paper or cluttered mobile apps) can be inefficient and
          overwhelming. This project aims to simplify task management by providing
          an intuitive, streamlined web app where users can easily add, organize,
          and track their to-do items.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Target Users</h2>
        <ul>
          <li>
            <strong>Students:</strong> Need to manage homework, project deadlines, and study
            schedules.
          </li>
          <li>
            <strong>Professionals:</strong> Require a quick way to list daily tasks,
            meetings, and priorities.
          </li>
          <li>
            <strong>General Users:</strong> Anyone looking for a simple, distraction-free
            tool to improve personal productivity.
          </li>
        </ul>
      </section>
      
      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li>
            <strong>Simplified Task Management:</strong>
            Clean interface for quick task addition, completion, and deletion.
          </li>
          <li>
            <strong>User-Friendly Experience:</strong>
            Minimal clutter to reduce cognitive overload.
          </li>
          <li>
            <strong>Efficiency Boost:</strong>
            Task prioritization and filtering for better organization.
          </li>
          <li>
            <strong>Responsive Design:</strong>
            Works seamlessly on desktop and mobile devices.
          </li>
        </ul>
      </section>
      
      <section className="about-section">
        <h2>Meet The Team</h2>
        <div className="team-members">
          <div className="team-member">
            <h3>Yousef Alhazmi</h3>
            <p>Student ID: 2135956</p>
          </div>
          <div className="team-member">
            <h3>Nawaf Bahlas</h3>
            <p>Student ID: 2236712</p>
          </div>
          <div className="team-member">
            <h3>Hussam Hadadi</h3>
            <p>Student ID: 2137450</p>
          </div>
        </div>
      </section>
      
      <section className="about-section">
        <h2>Project Details</h2>
        <p>
          This project was developed as part of the CPIT 405 course at King Abdulaziz University,
          under the supervision of Dr. Ahmed Tayeb from the Department of Information Technology,
          Faculty of Computing and Information Technology.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;