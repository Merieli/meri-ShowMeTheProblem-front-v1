import apiClient from './server.json'
import { IFeedbackApiClientUrls, IUserApiClientUrls } from '@/interfaces'
import { UserModel, FeedbackModel } from '@/models'

const urlUser: IUserApiClientUrls = apiClient.user
const userApiClient = new UserModel(urlUser)

const urlFeedback: IFeedbackApiClientUrls = apiClient.feedback
const feedbackApiClient = new FeedbackModel(urlFeedback)

const callApiClient = {
    user: userApiClient,
    feedback: feedbackApiClient,
}

export default callApiClient
