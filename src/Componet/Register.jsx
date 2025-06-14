import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register(form.username, form.password); // You can enhance the backend to accept all fields
      alert('Registered Successfully. Please log in.');
      navigate('/login');
    } catch {
      alert('Username already exists');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>

        <input name="firstName" placeholder="First Name" onChange={handleChange} required className="register-input" />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="register-input" />
        <input name="username" placeholder="Username" onChange={handleChange} required className="register-input" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="register-input" />
        <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required className="register-input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="register-input" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required className="register-input" />

        <button type="submit" className="register-button">Register</button>
        <div className="login-link">
  Already have an account? <Link to="/login">Login here</Link>
</div>
      </form>
      
    </div>
  );
}

export default Register;
