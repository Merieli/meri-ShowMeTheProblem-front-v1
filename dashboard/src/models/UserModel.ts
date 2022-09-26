import { IUser, IUserApiClientUrls, IUserLogged, IUserModelApi } from '@/interfaces'
import httpClient from '@/services/index'

export class UserModel implements IUserModelApi {
    constructor(private readonly url: IUserApiClientUrls) {}

    /**
     * @name register
     * @descripton método que registra o usuário no projeto
     * @param name nome do usuário
     * @param email email do usuário
     * @param password password do usuário
     */
    async register(name: string, email: string, password: string): Promise<IUser> {
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
    async login(email: string, password: string): Promise<IUserLogged> {
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
     * @description método que captura os dados do usuário
     * @param token chave de acesso do usuário
     * @returns id, name, email, apiKey e createAt do usuário
     */
    async show(token: string): Promise<IUser> {
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
