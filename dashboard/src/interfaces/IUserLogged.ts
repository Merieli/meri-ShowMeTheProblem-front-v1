import { IUser, IConfiguredFilters, IFeedbacksPagination, IFeedback } from './'

export interface IUserLogged extends Pick<IUser, 'name'> {
    token: string
    apiKey: string
    feedbacks: IFeedback[]
    feedbacksData: {
        filters: IConfiguredFilters[]
        pagination: IFeedbacksPagination
        currentType: string
    }
}
