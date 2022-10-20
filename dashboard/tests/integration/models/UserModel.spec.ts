import { IUserApiClientUrls, IUserModelApi } from '../../../src/interfaces'
import { UserModel } from '@/models/UserModel'
import httpClient from '@/services/index'
import apiClient from '@/services/server.json'

describe('Class UserModel.ts', () => {
    jest.mock('@/services/index')
    const mockHttp = httpClient as jest.Mocked<typeof httpClient>

    let sut: IUserModelApi
    let urlUser: IUserApiClientUrls

    const sutFactory = () => {
        urlUser = apiClient.user
        return new UserModel(urlUser)
    }

    const name = 'Jolie'
    const email = 'teste@gmail.com'
    const password = '123456'
    const tokenValue = '123.123.123abcd'
    const apiKey: string[] = ['8b2f515b-42b6-4a06-gf54-e9e7bbb999a3']
    const id = 'babcdef14-c07c-4595-a5a8-17e96eb12a98'
    const createdAt = 1664732641013

    beforeEach(() => {
        sut = sutFactory()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Integração', () => {
        describe('🧠 Comportamento:', () => {
            test('Dado um email e senha do usuário Quando efetuar um registro Então deve cadastrar o usuário', async () => {
                const dataRegister = {
                    data: {
                        id: id,
                        name: name,
                        email: email,
                        password: password,
                        apiKey: apiKey,
                        createdAt: createdAt,
                    },
                }
                const payloadParams = { name, email, password }

                mockHttp.post = jest.fn().mockResolvedValueOnce(dataRegister)
                const response = await sut.register(name, email, password)

                // console.log('Para validar com quais parametros a função foi chamada>>>', mockHttp.post.mock.calls[0])
                expect(mockHttp.post).toHaveBeenCalledWith(urlUser.register, payloadParams)
                expect(mockHttp.post).toHaveBeenCalled()
                expect(response).toHaveProperty('createdAt', createdAt)
                expect(response).toHaveProperty('apiKey', apiKey)
                expect(response).toHaveProperty('password', password)
            })

            test('Dado um email e senha Quando executado o login do usuário Então a resposta deve possuir um token', async () => {
                const dataToken = {
                    data: { token: tokenValue },
                }
                const payloadParams = { email, password }

                mockHttp.post = jest.fn().mockResolvedValueOnce(dataToken)
                const response = await sut.login(email, password)

                expect(mockHttp.post).toHaveBeenCalledWith(urlUser.login, payloadParams)
                expect(mockHttp.post).toHaveBeenCalled()
                expect(response).toHaveProperty('token')
            })

            test('Dado um usuário logado Quando exibir os dados Então a resposta deve possuir o name e email do usuário', async () => {
                const dataUser = {
                    data: { id, name, email, apiKey, createdAt },
                }
                const payloadParams = { headers: { Authorization: `Bearer ${tokenValue}` } }

                mockHttp.get = jest.fn().mockResolvedValueOnce(dataUser)
                const response = await sut.findByToken(tokenValue)

                expect(mockHttp.get).toHaveBeenCalledWith(urlUser.show, payloadParams)
                expect(mockHttp.get).toHaveBeenCalled()
                expect(response).toHaveProperty('apiKey', apiKey)
                expect(response).toHaveProperty('createdAt', createdAt)
            })

            test('Dado o token do usuário Quando for gerada uma chave Então deve retornar uma nova apiKey', async () => {
                const dataKey = { data: { apiKey: apiKey } }
                const payloadParams = { headers: { Authorization: `Bearer ${tokenValue}` } }

                mockHttp.post = jest.fn().mockResolvedValueOnce(dataKey)
                const response = await sut.generateNewKey(tokenValue)

                expect(mockHttp.post).toHaveBeenCalledWith(urlUser.newApiKey, {}, payloadParams)
                expect(mockHttp.post).toHaveBeenCalled()
                expect(response).toHaveProperty('[]', apiKey)
            })

            // test('Dado dados inválidos Quando efetuar login Então recebe um erro de que não foi encontrado', async () => {
            //     let error
            //     // const responseError = { status: 404, statusText: 'Not Found' }

            //     mockHttp.post = jest.fn().mockResolvedValueOnce({})

            //     try {
            //         const response = await sut.login(email, password)
            //     } catch (requestError) {
            //         error = requestError
            //     }

            //     console.log('>>>', error)
            //     expect(error.name).toBe('status')
            //     expect(error).toHaveProperty('statusText')
            // })
        })
    })
})
