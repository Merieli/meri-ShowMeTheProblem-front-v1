import BaseNotification from '@/components/BaseNotification.vue'
import { key } from '@/store'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'

describe('BaseNotification', () => {
    // const mockNotifications = (state) => state.notifications
    const mockState = {
        notifications: [
            {
                type: 'SUCESSO',
                title: 'Teste',
                text: 'blabla',
                id: 12,
            },
        ],
    }

    const createMockVuexStore = () => {
        return createStore({
            state: mockState,
            getters: { notifications: (state) => state.notifications },
        })
    }

    function factory(storeMock: any) {
        return mount(BaseNotification, {
            global: {
                plugins: [[storeMock, key]],
            },
        })
    }

    describe('Integração/Componente', () => {
        // describe('Renderização:', () => {
        //     return
        // })
        describe('Comportamento:', () => {
            test('Chama o getter de notifications da store', async () => {
                const storeMock = createMockVuexStore()
                const wrapper = factory(storeMock)
                await wrapper.find('.notification').trigger('click')

                expect(jest.spyOn(storeMock.getters.notifications)).toHaveBeenCalled()
            })

            test('Dado a store quando tiver dados no state de notifications então o title deve ser "Teste"', async () => {
                const storeMock = createMockVuexStore()
                const wrapper = factory(storeMock)
                // expect(storeMock.state.notifications[0].title).toContain('Teste')
                expect(wrapper.html()).toContain('Teste')
            })
        })
        // describe('Navegação:', () => {
        //     return
        // })
    })
})

// describe('função', () => {
//     describe('Unidade', () => {
//         return
//     })
// })
