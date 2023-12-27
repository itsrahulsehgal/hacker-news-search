import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; 

const SignIn = ({ onSignInSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
      setError(null);
      if (onSignInSuccess) {
        onSignInSuccess();
      }

      navigate('/home');
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Sign In</h2>
      <form className="form" onSubmit={handleSignIn}>
        <label className="label">Email:</label>
        <input type="email" value={email} className="input" onChange={(e) => setEmail(e.target.value)} required />

        <label className="label">Password:</label>
        <input type="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="button">Sign In</button>
      </form>

      {error && <p className="text" style={{ color: 'red' }}>{error}</p>}

      <p className="text">
        Don't have an account?{' '}
        <Link to="/signup" className="link">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
