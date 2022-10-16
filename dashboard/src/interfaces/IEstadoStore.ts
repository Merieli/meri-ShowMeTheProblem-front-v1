import {
    INotification,
    IUserLogged,
    IUser,
    IFeedbackFilters,
    IFeedback,
    IConfiguredFilters,
    IFeedbacksPagination,
} from './'

export interface IEstadoStore {
    users: IUser[]
    notifications: INotification[]
    isLogged: boolean
    userLogged: IUserLogged
    feedbacks: {
        data: IFeedback[]
        filters: IConfiguredFilters[]
        pagination: IFeedbacksPagination
        currentType: string
    }
    filters: IFeedbackFilters
    isLoading: boolean
    hasErrors: boolean
}
