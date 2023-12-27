import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

const SignUp = ({ onSignUpSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must contain at least 8 characters, including one uppercase letter and one digit.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully');
      setError(null);
      if (onSignUpSuccess) {
        onSignUpSuccess();
      }
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Sign Up</h2>
      <form className="form" onSubmit={handleSignUp}>
        <label className="label">Email:</label>
        <input type="email" value={email} className="input" onChange={(e) => setEmail(e.target.value)} required />

        <label className="label">Password:</label>
        <input type="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="button">Sign Up</button>
      </form>

      {error && <p className="text" style={{ color: 'red' }}>{error}</p>}

      <p className="text">
        Already have an account?{' '}
        <Link to="/signin" className="link">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
