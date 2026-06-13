import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000, 
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor: Automatically injects JWT tokens whenever we protect backend routes later
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("venclux_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;


