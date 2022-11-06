import { IUser } from './IUser';
import { IUserLogged } from './IUserLogged';

export interface UserRepositoryShape {
    register(name: string, email: string, password: string): Promise<IUser>;
    login(email: string, password: string): Promise<IUserLogged>;
    findByToken(token: string): Promise<IUser>;
    generateNewKey(token: string): Promise<Pick<IUserLogged, 'apiKey'>>;
}
