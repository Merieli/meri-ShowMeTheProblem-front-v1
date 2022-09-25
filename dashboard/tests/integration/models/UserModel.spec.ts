import { IUserApiClientUrls } from '@/interfaces'
import { UserModel } from '@/models'
import apiClient from '@/services/server.json'
import mockAxios, { Axios, AxiosStatic } from 'axios'

describe('Class UserModel.ts', () => {
    jest.mock('axios')
    jest.mock('')

    const mockAxios = Axios as jest.Mock<AxiosStatic>

    const urlUserMock: jest.Mocked = {
        login: jest.fn(),
        register: jest.fn(),
    }

    const urlUser: IUserApiClientUrls = apiClient.user
    const UserMock = new UserModel(urlUser)

    beforeEach(() => {})

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Integração', () => {
        describe('🧠 Comportamento:', () => {
            test.only('Dado um email e senha Quando executado o login do usuário Então a resposta deve possuir um token', async () => {
                const token = '123.123.123abcd'
                mockAxios.post.mockImplementationOnce(() => {
                    return Promise.resolve(data: {
                        token: '123.123.123abcd',
                    },)
                })

                

                const response = (await UserMock.login('teste@gmail.com', '123456')) as jest.Mocked<UserModel>

                expect(response.data).toHaveProperty('token')
            })

            test('Dado um email e senha do usuário Quando efetuar um registro Então deve cadastrar o usuário', async () => {
                const user ={
                    name: 'Igor',
                    password: '1234567bla'
                }
            })

            test('Dado dados inválidos Quando efetuar login Então recebe um erro de que não foi encontrado', async () => {
                const errors = { status: 404, statusText: 'Not Found' }

                expect(response.errors).toHaveProperty('status')
                expect(response.errors).toHaveProperty('statusText')
            })
        })
    })
})
