import BaseNotification from '@/components/BaseNotification.vue';
import { StateStoreShape, TypeOfNotification } from '@/interfaces';
import { key } from '@/store';
import { mount } from '@vue/test-utils';
import { createStore, Store } from 'vuex';

describe('BaseNotification', () => {
    const mockNotifications = () => mockState.notifications;

    type TStoreState = Pick<StateStoreShape, 'notifications'>;

    const mockState: TStoreState = {
        notifications: [
            {
                type: TypeOfNotification.SUCESSO,
                title: 'Teste',
                text: 'Uma notificação exibida',
                id: 12,
            },
        ],
    };
    let mockVuexStore: Store<TStoreState>;

    beforeEach(() => {
        mockVuexStore = createStore<TStoreState>({
            state: mockState,
            getters: { notifications: mockNotifications },
        });
    });

    function factory(storeMock: Store<TStoreState>) {
        return mount(BaseNotification, {
            global: {
                plugins: [[storeMock, key]],
            },
        });
    }

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', () => {
                const wrapper = factory(mockVuexStore);
                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado a store quando tiver dados no state de notifications então deve possuir um título da notificação equivalente', () => {
                const wrapper = factory(mockVuexStore);

                expect(wrapper.find('[data-test="title"]').text().trim()).toEqual('Teste');
                expect(wrapper.html()).toContain('Teste');
            });
        });

        describe('Comportamento:', () => {
            return;
        });
    });
});
