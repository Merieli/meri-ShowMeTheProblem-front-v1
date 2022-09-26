import { IUserApiClientUrls, IUserModelApi } from '@/interfaces'
import { UserModel } from '@/models'
import apiClient from '@/services/server.json'
import axios from 'axios'

describe('Class UserModel.ts', () => {
    jest.mock('axios')
    const mockAxios = axios as jest.Mocked<typeof axios>
    // jest.mock('@/models')

    // const urlUserMock: jest.Mocked<IUserModelApi> = {
    //     login: jest.fn(),
    //     register: jest.fn(),
    // }

    jest.mock('@/services/index')

    class UserModelMock implements IUserModelApi {}

    jest.mock('../../src/models/UserModel.ts', () => {
        return {
            UserModel: jest.fn().mockImplementation(() => {
                return {
                    login: jest.fn(),
                    register: jest.fn(),
                    show: jest.fn(),
                }
            }),
        }
    })

    const urlUser: IUserApiClientUrls = apiClient.user
    const MockedUserModel = jest.mocked(UserModel, true)

    // beforeEach(() => {})

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Integração', () => {
        describe('🧠 Comportamento:', () => {
            test('Dado um email e senha Quando executado o login do usuário Então a resposta deve possuir um token', async () => {
                const dataToken = { data: { token: '123.123.123abcd' } }
                const email = 'teste@gmail.com'
                const password = '123456'

                mockAxios.post.mockResolvedValueOnce(dataToken)

                const response = await MockedUserModel.login(email, password)
                expect(axios.get).toHaveBeenCalledWith(urlUser)
                expect(mockAxios.post).toHaveBeenCalled()
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
