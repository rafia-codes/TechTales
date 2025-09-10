import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://techtales-g9wi.onrender.com/', 
  withCredentials: true,
});

export default apiClient;