import BaseNotification from '@/components/BaseNotification.vue'
import { key } from '@/store'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'

describe('BaseNotification', () => {
    const mockNotifications = () => mockState.notifications
    const mockState = {
        notifications: [
            {
                type: 'SUCESSO',
                title: 'Teste',
                text: 'Uma notificação exibida',
                id: 12,
            },
        ],
    }
    let mockVuexStore: any

    beforeEach(() => {
        mockVuexStore = createStore({
            state: mockState,
            getters: { notifications: mockNotifications },
        })
    })

    function factory(storeMock: any) {
        return mount(BaseNotification, {
            global: {
                plugins: [[storeMock, key]],
            },
        })
    }

    describe('Integração/Componente', () => {
        describe('Renderização:', () => {
            test('Dado o html quando renderizado então deve ter os mesmos dados do snapshot gravado', () => {
                const wrapper = factory(mockVuexStore)
                expect(wrapper.html()).toMatchSnapshot()
            })

            test('Dado a store quando tiver dados no state de notifications então o título da notificação deve ser "Teste"', async () => {
                const wrapper = factory(mockVuexStore)

                expect(wrapper.find('[data-test="title"]').text().trim()).toEqual('Teste')
                expect(wrapper.html()).toContain('Teste')
            })
        })

        describe('Comportamento:', () => {
            return
        })
    })
})
