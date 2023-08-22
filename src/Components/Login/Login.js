import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        {action === "Login" ? <div></div> : (
          <div className='input'>
            <input
              type='text'
              placeholder='Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className='input'>
          <input type='email' placeholder='Email' />
        </div>
        <div className='input'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {action === "Sign Up" ? <div></div> : (
        <div className='forgot-password'>
          Lost Password ?<span>Click here!</span>
        </div>
      )}

      <div className='submit-container'>
        <a href='/chat' className={action === "Login" ? "submit gray" : "submit"}onClick={()=>{setAction("Sign Up")}}>
          Sign Up
        </a>
        <a href='/chat' className={action === "Sign Up" ? "submit gray" : "submit"}onClick={()=>{setAction("Login")}}>
          Login
        </a>
      </div>
      
    </div>
  );
};

export default Login;
