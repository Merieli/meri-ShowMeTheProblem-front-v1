import { INotification, IUserLogged, IUser, IFeedbackFilters } from './'

export interface IEstadoStore {
    users: IUser[]
    notifications: INotification[]
    isLogged: boolean
    userLogged: IUserLogged
    filters: IFeedbackFilters
    isLoading: boolean
    hasErrors: boolean
}
