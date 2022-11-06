import { IUser } from './';

export interface IUserLogged extends Pick<IUser, 'name'> {
    token: string;
    apiKey: string;
}
