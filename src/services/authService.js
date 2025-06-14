import axios from 'axios';

const API = 'http://localhost:5000/api/auth'; // Change if needed

export const login = async (username, password) =>
  await axios.post(`${API}/login`, { username, password });

export const register = async (username, password) =>
  await axios.post(`${API}/register`, { username, password });