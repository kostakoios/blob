import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateRequired = () => {
    if (!password || !email) {
      setErrorMessage('Please fill all empty fields');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Handle the login logic here
    if (validateRequired()) {
      try {
        // Dispatch your login action or handle login logic here
        // dispatch(login({ email, password }));
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    } 
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex-container'>
          <div className='label-container'>
            <label>Email:</label>
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className='flex-container'>
          <div className='label-container'>
            <label>Password:</label>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Login</button>
        <div style={{ height: '30px', color: 'red' }}>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <Link to="/register">Not a User? Register</Link>
      </form>
    </div>
  );
};

export default Login;
