import PartModal from '@/components/PartModal.vue';
import { StateStoreShape } from '@/interfaces';
import { key } from '@/store';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createStore, Store } from 'vuex';

describe('PartModal', () => {
    jest.mock('@/http/index');
    type TStoreState = Pick<StateStoreShape, 'users' | 'isLoading'>;

    const mockState: TStoreState = {
        users: [
            {
                name: 'SUCESSO',
                email: 'Teste',
                password: 'Uma notificação exibida',
            },
        ],
        isLoading: false,
    };
    const actions = {
        LOGIN_USER: jest.fn(),
        REGISTER_USER: jest.fn(),
    };

    let mockVuexStore: Store<TStoreState>;

    beforeEach(() => {
        mockVuexStore = createStore<TStoreState>({
            state: mockState,
            actions,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    function factory(storeMock: Store<TStoreState> = mockVuexStore, type = 'create') {
        return mount(PartModal, {
            global: {
                plugins: [[storeMock, key]],
                stubs: {
                    teleport: true,
                    transition: true,
                },
            },
            props: {
                open: true,
                typeModal: type,
            },
        });
    }

    describe('Integração/Componente', () => {
        describe('Renderização:', () => {
            test('Dado o html quando renderizado então deve ter os mesmos dados do snapshot gravado', () => {
                const wrapper = factory();

                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado um modal Quando renderizado Então deve possuir as props com valores', () => {
                const wrapper = factory();

                expect(wrapper.props('typeModal')).toBe('create');
                expect(wrapper.props('open')).toBeTruthy();
            });
        });
        describe('Comportamento:', () => {
            test('Dado um modal aberto Quando clicar em fechar Então deve emitir um método close', async () => {
                const wrapper = factory();
                const button = wrapper.find('[data-modal="main"]');
                await button.trigger('click');

                expect(wrapper.emitted()).toHaveProperty('close');
                expect(wrapper.emitted().close).toHaveLength(1);
            });

            test('Dado um modal para criar usuário Quando preenchido com nome, email e senha e clicado em "Criar conta" Então deve executar a Action de registro uma vez e fechar o modal', async () => {
                const wrapper = factory();
                const actionCreate = actions.REGISTER_USER;
                const name = wrapper.find('[data-form-name]');
                const email = wrapper.find('[data-form-email]');
                const password = wrapper.find('[data-form-password]');
                const buttonCreate = wrapper.find('[data-button="createAccount"]');
                name.setValue('João Joaquim Enambrio');
                email.setValue('joao.enambrio@gmail.com');
                password.setValue('abcds12356');
                await buttonCreate.trigger('submit');

                expect(actionCreate).toHaveBeenCalled();
                expect(actionCreate).toHaveBeenCalledTimes(1);
                expect(wrapper.emitted()).toHaveProperty('close');
            });

            test('Dado um modal para login do usuário Quando preenchido com email e senha e clicado em "Entrar" Então deve executar a Action de login uma vez e fechar o modal', async () => {
                const wrapper = factory(mockVuexStore, 'login');
                const actionLogin = actions.LOGIN_USER;
                const email = wrapper.find('[data-form-email]');
                const password = wrapper.find('[data-form-password]');
                const buttonLogin = wrapper.find('[data-button="loginAccount"]');
                email.setValue('joao.enambrio@gmail.com');
                password.setValue('abcds12356');
                await buttonLogin.trigger('submit');

                expect(actionLogin).toHaveBeenCalled();
                expect(actionLogin).toHaveBeenCalledTimes(1);
                expect(wrapper.emitted()).toHaveProperty('close');
            });

            test('Dado um modal Quando estiver carregando um login Então deve exibir um ícone de loading e o botão deve ficar desativado', async () => {
                mockState.isLoading = true;
                await nextTick();

                const wrapper = factory();
                const loading = wrapper.findAll('[data-register="icon-loading"]');
                const buttonRegister = wrapper.find('[data-button="createAccount"]');

                expect(loading).toHaveLength(1);
                expect(buttonRegister.classes()).toContain('opacity-50');
                expect(buttonRegister.classes('opacity-50')).toBeTruthy();
                expect(buttonRegister.attributes('disabled')).toContain('');
            });
        });
    });
});
