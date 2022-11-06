import { INotification, IUserLogged, IUser, IFeedbackFilters, IFeedbacks } from '.';

export interface StateStoreShape {
    users: IUser[];
    notifications: INotification[];
    isLogged: boolean;
    userLogged: IUserLogged;
    feedbacks: IFeedbacks;
    filters: IFeedbackFilters;
    isLoading: boolean;
    hasErrors: boolean;
}
