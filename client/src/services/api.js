import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token to headers if available (checking persistent localStorage or session-based sessionStorage)
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('clothing_swap_token') || sessionStorage.getItem('clothing_swap_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
