import GeralHeader from '@/components/GeralHeader.vue'
// import PartModal from '@/components/Modal/index.vue'
import { routes } from '@/router'
import { key } from '@/store'
import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'

describe('GeralHeader', () => {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

    const mockStore = createStore({
        state: {
            isLogged: false,
            userLogged: {
                name: '',
            },
        },
    })

    let wrapper: VueWrapper

    beforeEach(async () => {
        router.push('./')
        await router.isReady()

        wrapper = mount(GeralHeader, {
            global: {
                plugins: [[mockStore, key], router],
            },
        })
    })
    const spyDispatch = jest.spyOn(mockStore, 'dispatch').mockImplementation()

    afterEach(() => {
        wrapper.unmount()
    })

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', async () => {
                expect(wrapper.html()).toMatchSnapshot()
            })

            test('Dado o componente quando for montado deve ser uma instancia vue', () => {
                expect(wrapper.vm).toBeDefined()
            })
        })
        describe('🧠 Comportamento:', () => {
            test('Dado o botão de deslogar da conta Quando não houver nome do usuário Então mostra três pontos', async () => {
                mockStore.state.isLogged = true
                await nextTick()
                const buttonLogout = wrapper.get('#logout-button')

                expect(buttonLogout.text()).toBe('... (sair)')
            })

            test('Dado o botão de deslogar da conta Quando houver usuário Então deve exibir seu nome', async () => {
                mockStore.state.isLogged = true
                mockStore.state.userLogged.name = 'Jorge'
                await nextTick()
                const buttonLogout = wrapper.get('#logout-button')

                expect(buttonLogout.text()).toBe('Jorge (sair)')
            })

            test('Dado que o usuário precisa criar uma conta quando clicar em "Crie uma conta" então deve exibir um modal', async () => {
                mockStore.state.isLogged = true
                mockStore.state.userLogged.name = 'Jorge'
                await nextTick()
                const button = wrapper.find('#button-create')
                await button.trigger('click')

                console.log('>>>>>', wrapper.html())

                expect(wrapper.emitted().click).toBeTruthy()
                // expect(wrapper.findComponent(PartModal)).toBeTruthy()
            })

            test.skip('Dado que o usuário precisa efetuar login quando clicar em "Entrar" então deve exibir um modal', async () => {
                await wrapper.find('[data-login]').trigger('click')

                expect(wrapper.emitted().click).toBeTruthy()
                // expect(wrapper.findComponent(PartModal)).toBeTruthy()
            })
        })
        describe('🐕 Navegação:', () => {
            it.skip('deveria abrir a rota "Credentials" ao efetuar login', () => {
                return
            })
        })
    })
})
