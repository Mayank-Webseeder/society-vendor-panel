// // Shared axios config
// import axios from 'axios';


// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT);



// const api = axios.create({
//   // baseURL: import.meta.env.VITE_ENVIRONMENT === 'production'
//   //   ? import.meta.env.VITE_API_BASE_URL // Full backend URL in production
//   //   : '/api', // Proxy for development
//   baseURL: API_BASE_URL,
//   // baseURL: '/api',    // Use proxy for development
//   timeout: API_TIMEOUT,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken');    // Retrieve the token from localStorage
//   if (token) config.headers.Authorization = `Bearer ${token}`;    // Add the token to the Authorization header
//   return config;
// });


// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     const status = err.response?.status;
//     const msg = err.response?.data?.msg;

//     if (!err.response) {
//       console.error('Network error or server unreachable:', err);
//       throw new Error('Network error or server unreachable');
//     }
//     if (status === 400) throw new Error(msg || 'Bad request');
//     if (status === 401) {
//       localStorage.removeItem('authToken');
//       throw new Error('Unauthorized');
//     }
//     if (status === 500) throw new Error(msg || 'Server error');
//     console.error('Unhandled error:', err.response);
//     throw new Error('Unexpected error');
//   }
// );


// export default api;







import axios from "axios";

// Environment variables with fallbacks
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - automatically adds token to all requests
api.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage (supports both 'token' and 'authToken' keys)
    const token = localStorage.getItem("token") || localStorage.getItem("authToken");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error("Network error - no response received");
      return Promise.reject(new Error("Network error. Please check your connection."));
    }

    const status = error.response.status;

    // Handle 401 Unauthorized - clear tokens and optionally redirect
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");
      
      // Uncomment if you want automatic redirect to login
      // if (window.location.pathname !== "/login") {
      //   window.location.href = "/login";
      // }
    }

    return Promise.reject(error);
  }
);

export default api;