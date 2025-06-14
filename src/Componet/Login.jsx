import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      localStorage.setItem('token', res.data.token);
      navigate('/chat');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <input
          className="login-input"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>

        <div className="login-register-link">
          Not registered? <Link to="/register">Create an account</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
