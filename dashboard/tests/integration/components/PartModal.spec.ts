import PartModal from '@/components/PartModal.vue'
import { key } from '@/store'
import { Actions } from '@/store/type-actions'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'

// import { createStore } from 'vuex'

describe('PartModal', () => {
    const registerMock = jest.fn()

    const createMockVuexStore = () => {
        const actionsMock = {
            [Actions.REGISTER_USER]: registerMock,
            [Actions.LOGIN_USER]: jest.fn(),
        }
        return createStore({
            state: {
                users: [
                    {
                        name: 'Merieli',
                        email: 'xyx',
                        password: '166237',
                    },
                ],
                isLoading: false,
            },
            actions: actionsMock,
        })
    }

    function factory(store: any) {
        return mount(PartModal, {
            global: {
                provide: { [key as symbol]: store },
            },
            props: {
                open: true,
                typeModal: 'create',
            },
        })
    }

    // describe('Comportamento', () => {
    //     it('Deveria emitir o evento de close ao clicar no botão fechar', () => {
    //         const wrapper = factory()
    //         const closeButton = wrapper.find('.modal__button')

    //         console.log(wrapper)

    //         closeButton.trigger('click')

    //         expect(wrapper.emitted().close.length).toBe(1)
    //     })
    // })

    test('Store foi carregada', async () => {
        const storeMock = createMockVuexStore()
        const wrapper = factory(storeMock)

        const button = wrapper.find('[data-button="createAccount"]')
        await button.trigger('submit')

        expect(registerMock).toHaveBeenCalled()
    })
})
