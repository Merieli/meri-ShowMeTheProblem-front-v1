import axios, { AxiosInstance } from 'axios'

const API_ENVS = {
    production: '',
    development: '',
    local: 'http://localhost:3000',
}

const httpClient: AxiosInstance = axios.create({
    baseURL: API_ENVS.local,
})

httpClient.interceptors.request.use(
    (config) => {
        // const token = window.localStorage.getItem('token')
        // if (token) {
        //     config.headers?.Authorization = `Bearer ${token}`
        // }

        return config
    },
    (error) => Promise.reject(error)
)

httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
)

/*
Error.status === 404
E-mail não encontrado

Error.status === 401
E-mail/senha inválidos

Error.status === 404
Ocorreu um erro ao fazer o login
*/

export default httpClient
