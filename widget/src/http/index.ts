import axios, { AxiosInstance } from 'axios';
import FeedbacksService from './feedback';

interface UrlEnvs {
    [key: string]: string;
}

const API_ENVS: UrlEnvs = {
    production: 'https://backend-show-me-the-problem-etg6ezsb2-merieli.vercel.app/',
    development: 'http://localhost:3000',
    local: 'http://localhost:3000',
};

const httpClient: AxiosInstance = axios.create({
    baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local,
});

httpClient.interceptors.response.use(
    (response) => response,
    (error) => error
);

export default {
    feedbacks: FeedbacksService(httpClient),
};
