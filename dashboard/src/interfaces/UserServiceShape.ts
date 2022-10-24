import { IUserApiRegister } from './IUserApiRegister'

export interface UserServiceReponse {
    user: IUserApiRegister
    token: string
}

export interface UserServiceShape {
    setLogged(tokenStore: string): Promise<UserServiceReponse>
}
