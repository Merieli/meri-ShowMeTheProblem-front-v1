import { IUserApiClientUrls } from '@/interfaces/IUserApiClientUrls'
import httpClient from '@/services/index'

export class UserModel {
    constructor(private readonly url: IUserApiClientUrls) {}

    /**
     * @name register
     * @descripton método que registra o usuário no projeto
     * @param name nome do usuário
     * @param email email do usuário
     * @param password password do usuário
     * @returns
     */
    async register(name: string, email: string, password: string) {
        const params = {
            url: this.url.register,
            payload: {
                name,
                email,
                password,
            },
        }
        return httpClient
            .post(params.url, params.payload)
            .then((response) => response.data)
            .catch((e) => console.error(e))
    }

    /**
     * @name login
     * @description método que realiza autenticação e efetua login
     * de um usuário no projeto
     * @param email do usuário que deseja efetuar login
     * @param password do usuário que deseja efetuar login
     */
    async login(email: string, password: string) {
        const params = {
            url: this.url.login,
            payload: {
                email,
                password,
            },
        }
        return httpClient
            .post(params.url, params.payload)
            .then((response) => response.data)
            .catch((error) => console.error(error))
    }

    /**
     * @name show
     * @descripton método que captura os dados do usuário
     * @param token chave de acesso do usuário
     * @returns name e apiKey do usuário
     */
    async show(token: string) {
        const params = {
            url: this.url.show,
            payload: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
        return httpClient
            .get(params.url, params.payload)
            .then((response) => response.data)
            .catch((e) => console.error(e))
    }
}
