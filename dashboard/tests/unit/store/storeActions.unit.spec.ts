import repositories from '@/http/repositories';
import { IUser, StateStoreShape } from '@/interfaces';
import { actions } from '@/store';
import { Actions } from '@/store/type-actions';
import { Mutations } from '@/store/type-mutations';
import { ActionContext } from 'vuex';

describe('Actions da Store Vuex', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    const context: ActionContext<any, any> = {
        dispatch,
        commit,
        state: {},
        getters: {},
        rootState: {},
        rootGetters: {},
    };

    const user: IUser = {
        name: 'Joaberson',
        email: 'joaberson@gmail.com',
        password: 'adaksa123',
    };

    const token = '121asdasgs124q5475zxc';

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('🧪 Unidade:', () => {
        test('Dado um usuário Quando efetuar o Registro Então a action deve ter o comportamento adequado', async () => {
            repositories.user.register = jest.fn().mockResolvedValue('Success');

            await actions[Actions.REGISTER_USER](context, user);

            expect(repositories.user.register).toHaveBeenCalledTimes(1);
            expect(repositories.user.register).toHaveBeenCalledWith(user.name, user.email, user.password);

            expect(commit).toHaveBeenCalledTimes(3);
            expect(commit.mock.calls).toEqual([
                [Mutations.TOOGLE_LOADING, true],
                [Mutations.ADD_USER, 'Success'],
                [Mutations.TOOGLE_LOADING, false],
            ]);
        });

        test('Dado um usuário Quando efetuar o Registro com falha Então a action deve ter o comportamento adequado', async () => {
            repositories.user.register = jest.fn().mockImplementationOnce(() => Promise.reject());

            expect.assertions(1);
            await expect(actions[Actions.REGISTER_USER](context, user)).rejects.toThrowError(
                'Não foi possível efetuar cadastro. Confira os dados informados'
            );
        });

        test('Dado um usuário Quando efetuar o Login Então a action deve ter o comportamento adequado', async () => {
            repositories.user.login = jest.fn().mockResolvedValue('Success');

            await actions[Actions.LOGIN_USER](context, user);

            expect(repositories.user.login).toHaveBeenCalledTimes(1);
            expect(repositories.user.login).toHaveBeenCalledWith(user.email, user.password);

            expect(commit).toHaveBeenCalledTimes(2);
            expect(commit.mock.calls).toEqual([
                [Mutations.TOOGLE_LOADING, true],
                [Mutations.TOOGLE_LOADING, false],
            ]);

            expect(dispatch).toHaveBeenCalledTimes(1);
        });

        test('Dado um usuário Quando efetuar o Login com falha Então a action deve ter o comportamento adequado', async () => {
            repositories.user.login = jest.fn().mockImplementationOnce(() => Promise.reject());

            expect.assertions(3);
            await expect(actions[Actions.LOGIN_USER](context, user)).rejects.toThrowError(
                'Não foi possível efetuar login. Confira os dados informados'
            );
            expect(commit).toHaveBeenCalledTimes(3);
            expect(dispatch).toHaveBeenCalledTimes(0);
        });

        test('Dado um usuário Quando efetuar o Login e os dados forem buscados do localStorage Então a action deve ter o comportamento adequado', async () => {
            window.localStorage.setItem('token', token);
            repositories.user.findByToken = jest.fn().mockResolvedValue(user);

            await actions[Actions.GET_USER](context);

            expect(repositories.user.findByToken).toHaveBeenCalledTimes(1);
            expect(repositories.user.findByToken).toHaveBeenCalledWith(token);

            expect(commit).toHaveBeenCalledTimes(4);
            expect(commit.mock.calls).toEqual([
                [Mutations.TOOGLE_LOADING, true],
                [Mutations.LOGIN_USER, token],
                [Mutations.USER_LOGGED, user],
                [Mutations.TOOGLE_LOADING, false],
            ]);
        });

        test('Dado um usuário Quando efetuar o Login e os dados por token forem buscados com falha Então a action deve ter o comportamento adequado', async () => {
            repositories.user.findByToken = jest.fn().mockImplementationOnce(() => Promise.reject());

            expect.assertions(2);
            await expect(actions[Actions.GET_USER](context)).rejects.toThrowError(
                'Não foi possível capturar os dados do usuário pelo token.'
            );
            expect(commit).toHaveBeenCalledTimes(4);
        });
    });
});
