import React, { useState } from 'react';
import './Register.css';

const SignInPage = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = () => {
    // Validate fields
    let isValid = true;

    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

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
      if (action === 'Sign Up') {
        // Redirect to sign up page
        window.location.href = '/login'; // Change to your desired URL
      } else {
        // Redirect to login page
        window.location.href = '/'; // Change to your desired URL
      }
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        <div className='input'>
          <input
            type='text'
            placeholder='Name'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError('');
            }}
          />
          {usernameError && <div className='error'>{usernameError}</div>}
        </div>

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

      <div className='submit-container'>
        <a
          href='/login'
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          Sign Up
        </a>
      </div>
      <footer>
                <p>Already have account <a href="/login">Login</a>.</p>
              
            </footer>
    </div>
  );
};

export default SignInPage;
