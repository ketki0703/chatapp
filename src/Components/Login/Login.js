import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    // Validate fields
    let isValid = true;

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Perform the redirection logic here
      if (action === 'Login') {
        // Redirect to sign up page
        window.location.href = '/login'; // Change to your desired URL
      } else {
        // Redirect to login page
        window.location.href = '/chat'; // Change to your desired URL
      }
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        <div className='input'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
          />
          {emailError && <div className='error'>{emailError}</div>}
        </div>

        <div className='input'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
          />
          {passwordError && <div className='error'>{passwordError}</div>}
        </div>
      </div>

      {/* Displaying the "Lost Password" link */}
      <div className='forgot-password'>
        Lost Password ?<span>Click here!</span>
      </div>

      <div className='submit-container'>
        <a
          href='/chat'
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Login;
