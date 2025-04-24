import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://like-it-api-pre-prod.coak.fr',
  withCredentials: true,
});

export default axiosInstance;
