import { IUserApiClientUrls } from '../../../src/interfaces'
import { UserModel } from '@/models/UserModel'
import httpClient from '@/services/index'
import apiClient from '@/services/server.json'
import axios from 'axios'

describe('Class UserModel.ts', () => {
    // jest.mock('axios')
    jest.mock('@/services/index')

    // const mockAxios = axios as jest.Mocked<typeof axios>
    // beforeEach(() => {})

    const mockHttp = httpClient as jest.Mocked<typeof httpClient>

    const createSut = () => {
        const urlUser: IUserApiClientUrls = apiClient.user
        return new UserModel(urlUser)
    }

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Integração', () => {
        describe('🧠 Comportamento:', () => {
            test.only('Dado um email e senha Quando executado o login do usuário Então a resposta deve possuir um token', async () => {
                const name = 'Jolie'
                const email = 'teste@gmail.com'
                const password = '123456'

                const dataToken = {
                    data: { token: '123.123.123abcd' },
                }

                const sut = createSut()
                mockHttp.post.mockResolvedValueOnce(dataToken)

                const response = await sut.register(name, email, password)
                console.log('axios.post() called with>>>', mockHttp.post.mock.calls[0])
                // expect(httpClient.post).toHaveBeenCalledWith(urlUser)
                expect(mockHttp.post).toHaveBeenCalled()
                console.log('>>>>>', response)
                expect(response).toHaveProperty('token')
            })

            test('Dado um email e senha do usuário Quando efetuar um registro Então deve cadastrar o usuário', async () => {
                const user = {
                    name: 'Igor',
                    password: '1234567bla',
                }

                const dataRegister = {
                    id: 'b0094b14-c07c-4595-a5a8-17e96eb12a98',
                    name: 'Merieli',
                    email: 'merieli.dev@gmail.com',
                    password: '166237',
                    apiKey: ['6b2f515b-42b6-4a06-be54-e9e7bbb999a3'],
                    createdAt: 1664732641013,
                }
            })

            // test('Dado dados inválidos Quando efetuar login Então recebe um erro de que não foi encontrado', async () => {
            //     const errors = { status: 404, statusText: 'Not Found' }

            //     expect(response.errors).toHaveProperty('status')
            //     expect(response.errors).toHaveProperty('statusText')
            // })
        })
    })
})
