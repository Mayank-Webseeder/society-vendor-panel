// Shared axios config
import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT);



const api = axios.create({
  baseURL: API_BASE_URL,
  // baseURL: '/api',    // Use proxy for development
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const msg = err.response?.data?.msg;

    if (!err.response) {
      console.error('Network error or server unreachable:', err);
      throw new Error('Network error or server unreachable');
    }
    if (status === 400) throw new Error(msg || 'Bad request');
    if (status === 401) {
      localStorage.removeItem('authToken');
      throw new Error('Unauthorized');
    }
    if (status === 500) throw new Error(msg || 'Server error');
    console.error('Unhandled error:', err.response);
    throw new Error('Unexpected error');
  }
);


export default api;