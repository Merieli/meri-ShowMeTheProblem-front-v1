import { IUser, IStateFilters } from './'

export interface IUserLogged extends Pick<IUser, 'name'> {
    token: string
    apiKey: string
    filters: IStateFilters[]
    feedbacks: []
}
