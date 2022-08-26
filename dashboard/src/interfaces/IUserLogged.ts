import IUser from './IUser'

export default interface IUserLogged extends Omit<IUser, 'password' | 'email'> {
    token: string
    apiKey: string
}
