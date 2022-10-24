import httpClient from '@/http/index'
import apiClient from '@/http/server.json'
import { UserApiClientUrls, IUserLogged, UserRepositoryShape, IUserApiRegister, IUser } from '@/interfaces'

export class UserRepository implements UserRepositoryShape {
    private readonly url: UserApiClientUrls = apiClient.user

    constructor() {
        this.url
    }

    /**
     * @name register
     * @descripton método que registra o usuário no projeto
     * @param name nome do usuário
     * @param email email do usuário
     * @param password password do usuário
     */
    async register(name: string, email: string, password: string): Promise<IUserApiRegister> {
        const params = {
            url: this.url.register,
            payload: {
                name,
                email,
                password,
            },
        }
        return httpClient.post(params.url, params.payload).then((response) => response.data)
    }

    /**
     * @name login
     * @description método que realiza autenticação e efetua login
     * de um usuário no projeto
     * @param {string} email do usuário que deseja efetuar login
     * @param {string} password do usuário que deseja efetuar login
     */
    async login(email: string, password: string): Promise<IUserLogged> {
        const params = {
            url: this.url.login,
            payload: {
                email,
                password,
            },
        }
        return httpClient.post(params.url, params.payload).then((response) => response.data)
    }

    /**
     * @name findByToken
     * @description método que busca um usuário e retorna seus dados
     * @param token chave de acesso do usuário
     * @returns id, name, email, apiKey e createAt do usuário
     */
    findByToken(token: string): Promise<IUser> {
        const params = {
            url: this.url.show,
            payload: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
        return httpClient.get(params.url, params.payload).then((response) => response.data)
    }

    /**
     * @name generateNewKey
     * @description Gera uma nova chave de api para o usuário logado
     * @param token chave de acesso do usuário
     * @returns apiKey
     */
    async generateNewKey(token: string): Promise<Pick<IUserLogged, 'apiKey'>> {
        const params = {
            url: this.url.newApiKey,
            payload: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
        return httpClient.post(params.url, {}, params.payload).then((response) => response.data.apiKey)
    }
}
