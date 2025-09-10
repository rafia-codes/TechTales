import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://techtales-1-ez4f.onrender.com/', 
  withCredentials: true,
});

export default apiClient;