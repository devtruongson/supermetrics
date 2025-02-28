import { useAppStore } from '@/stores/appStore';
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_BE,
});

const token = useAppStore.getState().auth.token;

instance.interceptors.request.use(
    (config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use((response) => {
    const { data } = response;
    return data;
});

export default instance;
