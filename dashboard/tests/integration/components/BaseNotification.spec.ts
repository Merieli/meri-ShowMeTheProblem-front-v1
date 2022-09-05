import BaseNotification from '@/components/BaseNotification.vue'
import { key } from '@/store'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'

describe('component', () => {
    const mockNotifications = jest.fn()
    const storeMock = createStore({
        state: {
            notifications: [
                {
                    type: 'SUCESSO',
                    title: 'Teste',
                    text: 'blabla',
                    id: 12,
                },
            ],
        },
        getters: { notifications: mockNotifications },
    })
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
                const wrapper = factory(storeMock)
                await wrapper.find('.notification').trigger('click')

                expect(mockNotifications).toHaveBeenCalled()
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
