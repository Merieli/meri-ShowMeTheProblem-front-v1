import repositories from '@/http/repositories';
import { actions } from '@/store';
import { Actions } from '@/store/type-actions';
import { Mutations } from '@/store/type-mutations';
import { flushPromises } from '@vue/test-utils';
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

    const user = {
        name: 'Joaberson',
        email: 'joaberson@gmail.com',
        password: 'adaksa123',
    };

    describe('🧪 Unidade:', () => {
        test('Dado um usuário Quando efetuar o Login Então a action deve ter o comportamento adequado', async () => {
            repositories.user.login = jest.fn().mockResolvedValue('Success');

            const result = await actions[Actions.LOGIN_USER](context, user);
            await flushPromises();

            expect(repositories.user.login).toHaveBeenCalledTimes(1);
            expect(repositories.user.login).toHaveBeenCalledWith(user.email, user.password);

            expect(commit).toHaveBeenCalledTimes(2);
            expect(commit.mock.calls).toEqual([
                [Mutations.TOOGLE_LOADING, true],
                [Mutations.TOOGLE_LOADING, false],
            ]);

            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch.mock.calls[0][0]).toBe(Actions.GET_USER);
            // await expect(result).resolves.toEqual(undefined);
        });

        test('Dado um usuário Quando efetuar o Login com falha Então a action deve ter o comportamento adequado', async () => {
            repositories.user.login = jest.fn().mockRejectedValue(new Error('Async error message'));
            const user = {
                name: 'Joaberson',
                email: 'joaberson@gmail.com',
                password: 'adaksa123',
            };

            const result = await actions[Actions.LOGIN_USER](context, user);
            // await flushPromises();

            // expect(repositories.user.login).toHaveBeenCalledTimes(1);
            // expect(commit).toHaveBeenCalledTimes(2);
            // expect(dispatch).toHaveBeenCalledTimes(1);

            await expect(result).rejects.toThrowError('Não foi possível efetuar login. Confira os dados informados');
        });
    });
});
