
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mamun-reza-freeshops-backend.vercel.app/api/v1', 
  maxContentLength: Infinity,
    maxBodyLength: Infinity
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error?.response?.data?.message || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;