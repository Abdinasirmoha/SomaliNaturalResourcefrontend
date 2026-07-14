import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.MODE === 'development' 
    ? 'https://somalinaturalresource-1.onrender.com/api' 
    : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;