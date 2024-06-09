import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateRequired = () => {
    if (!firstName || !password || !lastName || !email) {
      setErrorMessage('Please fill all empty fields');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateRequired()) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/users/register',
          { firstName, lastName, email, password }
        );
        if (response.status === 201) {
          setAuthToken(response.data.token);
          localStorage.setItem('token', JSON.stringify(response.data.token));
          login();
          navigate('/');
        } else {
          throw new Error('Registration failed');
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex-container'>
           <div className='label-container'>
            <label>First Name:</label>
           </div>
           <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
           </div> 
        </div>
        <div className='flex-container'>
          <div className='label-container'>
            <label>Last Name:</label>
          </div>
          <div>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          </div>
        </div>
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
        <button type="submit">Register</button>
        <div style={{ height: '30px', color: 'red' }}>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <Link to="/login">Already a User? Login</Link>
      </form>
    </div>
  );
};

export default Register;
