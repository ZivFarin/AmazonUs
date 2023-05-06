//Login data including the login form and auth using firebase api
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

//connecting to the firebase project
const firebaseConfig = {
  apiKey: "AIzaSyAbr6iHHVwQ9BxycwDdkqeQLLD0kk3twgs",
  authDomain: "us-184db.firebaseapp.com",
  projectId: "us-184db",
  storageBucket: "us-184db.appspot.com",
  messagingSenderId: "310053069316",
  appId: "1:310053069316:web:d22c8f84679e2aa1cc4b51",
  measurementId: "G-S1343SSKC3"
};


//initialazing firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //handling the login to the system
  const handleLogin = (event) => {
    event.preventDefault();
    //taking the user email and password for the login
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', true); 
        // redirecting the page to the customerMain page after login
        history.push('/customerMain');
        history.go(0);
      })
      //catching errors
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  //handling the signup to the system
  const handleSignUp = (event) => {
    event.preventDefault();
    //taking the user email and password for the signup
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', true); 
        // redirecting the page to the customerMain page after login
        history.push('/customerMain');
        history.go(0);
      })
      //catching errors
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  // If user is already logged in, redirect to the customerMain page
  if (localStorage.getItem('isLoggedIn')) {
    history.push('/customerMain');
    history.go(0);
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        className="login-form__input"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="login-form__input"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {error && <div className="login-form__error">{error}</div>}
      <button type="submit" className="login-form__submit">Login</button>
      <button onClick={handleSignUp} className="login-form__submit">Create account</button>
    </form>
  );
}

export default withRouter(Login);
