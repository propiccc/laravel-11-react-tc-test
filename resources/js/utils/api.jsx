import axios from "axios";


const AxiosInstance = axios.create({
    withCredentials: true
})

AxiosInstance.interceptors.request.use((conf) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        conf.headers['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }

    return conf;

})

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );


export default AxiosInstance;
