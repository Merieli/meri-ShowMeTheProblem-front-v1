import { IUser, IConfiguredFilters } from './'

export interface IUserLogged extends Pick<IUser, 'name'> {
    token: string
    apiKey: string
    feedbackFilters: IConfiguredFilters[]
    feedbacks: []
}
