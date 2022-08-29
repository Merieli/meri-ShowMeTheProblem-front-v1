import axios, { AxiosInstance } from 'axios'

const API_ENVS = {
    production: '',
    development: '',
    local: 'http://localhost:3000',
}

const httpClient: AxiosInstance = axios.create({
    baseURL: API_ENVS.local,
})

// httpClient.interceptors.response.use(
//     (response) => response,
//     (error) => {}
// )

export default httpClient
