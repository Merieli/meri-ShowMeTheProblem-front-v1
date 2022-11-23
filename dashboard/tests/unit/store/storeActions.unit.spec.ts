import httpClient from '@/http/index';
import { actions } from '@/store';
import { Actions } from '@/store/type-actions';
import { flushPromises } from '@vue/test-utils';
import { ActionContext } from 'vuex';

describe('Actions da Store Vuex', () => {
    let url = '';
    let body = {};
    const mockError = false;

    jest.mock('@/http/index', () => ({
        login: (_url: string, _body: object) => {
            return new Promise((resolve) => {
                if (mockError) throw Error();

                url = _url;
                body = _body;
                resolve(true);
            });
        },
    }));
    const mockHttp = httpClient as jest.Mocked<typeof httpClient>;

    const context: ActionContext<any, any> = {
        dispatch: jest.fn(),
        commit: jest.fn(),
        state: {},
        getters: {},
        rootState: {},
        rootGetters: {},
    };
    const commit = jest.fn();
    // as jest.Mock<Context['commit']>;
    const dispatch = jest.fn();

    describe('🧪 Unidade:', () => {
        test.only('Dado um token de usuário Quando executar o Login na Store Então o usuário deve ser definido como logado e possuir um Token', async () => {
            const user = {
                name: 'Joaberson',
                email: 'joaberson@gmail.com',
                password: 'adaksa123',
            };

            const result = await actions[Actions.LOGIN_USER](context, user);
            await flushPromises();

            expect(commit).toHaveBeenCalledTimes(1);
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(result).resolves.toEqual('Algo');
            //     expect(store.commit).toHaveBeenCalled()
            //     expect(store.state.userLogged.token).toBe(token)
            //     expect(store.state.isLogged).toBe(true)
        });
    });
});
