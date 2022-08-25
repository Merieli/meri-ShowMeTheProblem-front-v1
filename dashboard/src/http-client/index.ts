import apiClient from './server.json'
import { IUserApiClientUrls } from '@/interfaces/IUserApiClientUrls'
import { UserModel } from '@/models/UserModel'

const url: IUserApiClientUrls = apiClient.user
const userApiClient = new UserModel(url)

const callApiClient = {
    user: userApiClient,
    feedback: apiClient.feedback,
}

export default callApiClient
