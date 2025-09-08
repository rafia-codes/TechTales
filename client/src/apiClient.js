import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://techtales-1-ez4f.onrender.com/', // your backend URL
  withCredentials: true, // ✅ send cookies
});

export default apiClient;