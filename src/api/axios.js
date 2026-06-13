// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5010/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Automatic Bearer Token Injection Interceptor for protected routes
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;


import axios from "axios";

const API = axios.create({
    // Leverages your specific variable configuration seamlessly
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5010/api",
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


