import { IUserApiClientUrls } from '@/interfaces'
import { UserModel } from '@/models'
import apiClient from '@/services/server.json'
import mockAxios from 'axios'

describe('UserModel', () => {
    jest.mock('axios')

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('', async () => {
        const token = '123.123.123abcd'

        mockAxios.post.mockImplementationOnce(() => {
            return Promise.resolve({ data: { token } })
        })

        const urlUser: IUserApiClientUrls = apiClient.user

        const newUser = new UserModel(urlUser)

        const response = await newUser.login('teste@gmai.com', '123456')

        expect(response.data).toHaveProperty('token')
    })
    test('', () => {})
    test('', () => {})
})
