import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // This now uses the Vite proxy to hit https://localhost:7183/api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;