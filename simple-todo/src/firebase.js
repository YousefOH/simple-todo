import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace these values with your own Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyCc0bLQHEPRpkcLQOJpd10OKBrKN_spC_Y",
    authDomain: "simple-todo-5b3cb.firebaseapp.com",
    databaseURL: "https://simple-todo-5b3cb-default-rtdb.firebaseio.com",
    projectId: "simple-todo-5b3cb",
    storageBucket: "simple-todo-5b3cb.firebasestorage.app",
    messagingSenderId: "109955256832",
    appId: "1:109955256832:web:0ea1d0bae251fc08ab3ee5"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };