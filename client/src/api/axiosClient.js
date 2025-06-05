import axios from 'axios';

// Determine if we're in production or development
const isProduction = window.location.hostname !== 'localhost';

// Set the base URL based on environment
const baseURL = isProduction 
  ? 'https://fiardealprime.onrender.com'  // Production URL
  : 'http://localhost:5000';              // Development URL

console.log('Environment:', isProduction ? 'Production' : 'Development');
console.log('API URL:', baseURL);

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
axiosClient.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosClient; 