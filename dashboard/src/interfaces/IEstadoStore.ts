import { INotification, IUserLogged, IUser } from './'

export interface IEstadoStore {
    users: IUser[]
    notifications: INotification[]
    isLogged: boolean
    userLogged: IUserLogged
    isLoading: boolean
    hasErrors: boolean
}
