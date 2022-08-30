import IUser from './IUser'

export default interface IUserLogged extends Pick<IUser, 'name'> {
    token: string
    apiKey: string
}
