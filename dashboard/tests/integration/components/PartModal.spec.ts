import PartModal from '@/components/PartModal.vue'
import { StateStoreShape } from '@/interfaces'
import { key } from '@/store'
import { mount } from '@vue/test-utils'
import { createStore, Store } from 'vuex'

describe('PartModal', () => {
    jest.mock('@/http/index')
    const mockLoading = () => mockState.isLoading
    type TStoreState = Pick<StateStoreShape, 'users' | 'isLoading'>

    const mockState: TStoreState = {
        users: [
            {
                name: 'SUCESSO',
                email: 'Teste',
                password: 'Uma notificação exibida',
            },
        ],
        isLoading: false,
    }
    let mockVuexStore: Store<TStoreState>

    beforeEach(() => {
        mockVuexStore = createStore<TStoreState>({
            state: mockState,
            getters: { notifications: mockLoading },
            actions: {},
        })
    })

    function factory(storeMock: Store<TStoreState>, type: string) {
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
        })
    }

    describe('Integração/Componente', () => {
        describe('Renderização:', () => {
            test('Dado o html quando renderizado então deve ter os mesmos dados do snapshot gravado', () => {
                const wrapper = factory(mockVuexStore, 'create')
                expect(wrapper.html()).toMatchSnapshot()
                console.log('>>>>', wrapper.html())
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
