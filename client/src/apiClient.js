import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:3200', // your backend URL
  withCredentials: true, // ✅ send cookies
});

export default apiClient;