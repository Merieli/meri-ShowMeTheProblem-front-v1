import { IUser } from './IUser'

export interface IUserApiRegister extends IUser {
    id: string
    apiKey: string[]
    createdAt: number
}
