import PartModal from '@/components/PartModal.vue'
import { key } from '@/store'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'

describe('PartModal', () => {
    jest.mock('@/http/index')
    const mockLoading = () => mockState.isLoading
    const mockState = {
        users: [
            {
                name: 'SUCESSO',
                email: 'Teste',
                password: 'Uma notificação exibida',
            },
        ],
        isLoading: false,
    }
    let mockVuexStore: any

    beforeEach(() => {
        mockVuexStore = createStore({
            state: mockState,
            getters: { notifications: mockLoading },
            actions: {},
        })
    })

    function factory(storeMock: any, type: string) {
        return mount(PartModal, {
            global: {
                plugins: [[storeMock, key]],
            },
            props: {
                open: true,
                typeModal: type,
            },
        })
    }

    describe('Integração/Componente', () => {
        describe('Renderização:', () => {
            test('Dado o html quando renderizado então deve ter os mesmos dados do snapshot gravado', () => {
                const wrapper = factory(mockVuexStore, 'create')
                expect(wrapper.html()).toMatchSnapshot()
            })
        })
        describe('Comportamento:', () => {
            return
        })
        describe('Navegação:', () => {
            return
        })
    })
})
