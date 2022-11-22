import { Context } from '@/interfaces';
import { actions } from '@/store';
import { Actions } from '@/store/type-actions';

describe('Actions da Store Vuex', () => {
    const commit = jest.fn() as jest.Mock<Context['commit']>;
    const dispatch = jest.fn() as jest.Mock<Promise<Context['dispatch']>>;

    describe('🧪 Unidade:', () => {
        test.only('Dado um token de usuário Quando executar o Login na Store Então o usuário deve ser definido como logado e possuir um Token', async () => {
            const user = {
                name: 'Joaberson',
                email: 'joaberson@gmail.com',
                password: 'adaksa123',
            };
            await actions[Actions.LOGIN_USER]({ commit, dispatch }, user);
            //     expect(store.commit).toHaveBeenCalled()
            //     expect(store.state.userLogged.token).toBe(token)
            //     expect(store.state.isLogged).toBe(true)
        });
    });
});
