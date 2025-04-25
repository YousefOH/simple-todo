import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="copyright">
          &copy; {currentYear} TaskMaster | Created by Yousef Alhazmi, Nawaf Bahlas, Hussam Hadadi
        </p>
        <p className="footer-text">
          CPIT 405 Project - King Abdulaziz University
        </p>
      </div>
    </footer>
  );
};

export default Footer;