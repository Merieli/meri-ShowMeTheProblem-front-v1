import { state } from './__mocks__/stateStore';
import { mutations } from '@/store';
import { Mutations } from '@/store/type-mutations';

describe('Mutations da Store Vuex', () => {
    describe('🧪 Unidade:', () => {
        test('Dado os usuários Quando for adicionado um novo Então deve exibir este novo usuário na lista', () => {
            const newUser = {
                name: 'Joaquim Mustache',
                email: 'joaquim.m@gmail.com',
                password: 'joquis12345',
            };

            mutations[Mutations.ADD_USER](state, newUser);

            expect(state.users).toContain(newUser);
        });

        test('Dado um usário Quando efetuar login Então deve salvar o token e setar os "isLogged" como true', () => {
            const token = '12askjd23l124k41';

            mutations[Mutations.LOGIN_USER](state, token);

            expect(state.userLogged.token).toEqual(token);
            expect(state.isLogged).toBeTruthy();
        });

        test('Dado os filtros de feedbacks Quando forem adicionados Então deve exibir os dados equivalentes configurados', () => {
            const data = {
                all: 10,
                issue: 3,
                idea: 5,
                other: 2,
            };
            const typeActive = 'all';
            const configureFilter = [
                {
                    active: true,
                    amount: 10,
                    color: {
                        bg: 'bg-info',
                        text: 'text-info',
                    },
                    label: 'Todos',
                    type: 'all',
                },
                {
                    active: false,
                    amount: 3,
                    color: { bg: 'bg-danger', text: 'text-danger' },
                    label: 'Problemas',
                    type: 'issue',
                },
                {
                    active: false,
                    amount: 5,
                    color: { bg: 'bg-warning', text: 'text-warning' },
                    label: 'Ideias',
                    type: 'idea',
                },
                {
                    active: false,
                    amount: 2,
                    color: { bg: 'bg-graydark', text: 'text-graydark' },
                    label: 'Outros',
                    type: 'other',
                },
            ];

            mutations[Mutations.ADD_CONFIGURED_FILTERS](state, { data, typeActive });

            expect(state.filters).toEqual(data);
            expect(state.feedbacks.filters).toEqual(configureFilter);
        });
    });
});
