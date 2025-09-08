import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // your backend URL
  withCredentials: true, // ✅ send cookies
});

export default apiClient;