import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

// Get CSRF token from cookies
const getCSRFToken = () => {
    return document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'))?.split('=')[1];
};

// Request Interceptor to add CSRF token and Bearer token
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        const csrfToken = getCSRFToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axiosInstance;
