import axios from 'axios'

// Create an Axios instance
const api = axios.create({baseURL: 'http://localhost:5000/api'});

// Request interceptor to add the JWT token to the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;