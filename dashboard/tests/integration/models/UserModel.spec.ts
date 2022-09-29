import { IUserApiClientUrls } from '../../../src/interfaces'
import { UserModel } from '@/models/UserModel'
import httpClient from '@/services/index'
import axios from 'axios'

describe('Class UserModel.ts', () => {
    // jest.mock('axios')

    const dataToken = { data: { token: '123.123.123abcd' } }
    jest.mock('axios', () => {
        return {
            login: jest.fn().mockReturnValue({
                interceptors: {
                    request: { use: jest.fn(), eject: jest.fn() },
                    response: { use: jest.fn(), eject: jest.fn() },
                },

                post: jest.fn().mockReturnValue(dataToken),
            }),
        }
    })

    // const mockAxios = axios as jest.Mocked<typeof axios>
    jest.mock('@/services/index')
    jest.mocked(httpClient, true)
    // beforeEach(() => {})

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Integração', () => {
        describe('🧠 Comportamento:', () => {
            test.only('Dado um email e senha Quando executado o login do usuário Então a resposta deve possuir um token', async () => {
                const email = 'teste@gmail.com'
                const password = '123456'

                // mockAxios.post.mockResolvedValueOnce(dataToken)

                const mockApiClient: jest.Mocked<IUserApiClientUrls> = {
                    login: '' as jest.Mocked<string>,
                    register: '' as jest.Mocked<string>,
                    show: '' as jest.Mocked<string>,
                    apiKeyExists: '' as jest.Mocked<string>,
                    newApiKey: '' as jest.Mocked<string>,
                }

                // const urlUser: IUserApiClientUrls = apiClient.user
                const user = new UserModel(mockApiClient)

                const response = await user.login(email, password)
                // expect(axios.get).toHaveBeenCalledWith(mockApiClient)
                // expect(mockAxios.post).toHaveBeenCalled()
                console.log('>>>>>', response)
                expect(response).toHaveProperty('token')
            })

            // test('Dado um email e senha do usuário Quando efetuar um registro Então deve cadastrar o usuário', async () => {
            //     const user = {
            //         name: 'Igor',
            //         password: '1234567bla',
            //     }
            // })

            // test('Dado dados inválidos Quando efetuar login Então recebe um erro de que não foi encontrado', async () => {
            //     const errors = { status: 404, statusText: 'Not Found' }

            //     expect(response.errors).toHaveProperty('status')
            //     expect(response.errors).toHaveProperty('statusText')
            // })
        })
    })
})
