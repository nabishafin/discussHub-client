import { AuthContext } from "@/provider/AuthProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://discusshub-server.vercel.app'
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isUnauthorized, setIsUnauthorized] = useState(false); // To trigger navigation

    // Interceptor for requests
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Interceptor for responses
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            setIsUnauthorized(true); // Mark as unauthorized
            await logOut();
        }
        return Promise.reject(error);
    });

    // UseEffect to handle navigation on unauthorized access
    useEffect(() => {
        if (isUnauthorized) {
            navigate('/login'); // Redirect to login
        }
    }, [isUnauthorized, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
