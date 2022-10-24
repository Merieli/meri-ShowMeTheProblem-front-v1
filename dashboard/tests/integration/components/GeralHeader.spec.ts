import GeralHeader from '@/components/GeralHeader.vue'
import { StateStoreShape } from '@/interfaces'
import { routes } from '@/router'
import { key } from '@/store'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'

describe('GeralHeader', () => {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

    const mockStore = createStore<Pick<StateStoreShape, 'isLogged' | 'userLogged'>>({
        state: {
            isLogged: false,
            userLogged: {
                name: '',
                token: '',
                apiKey: '',
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
                stubs: {
                    PartModal: {
                        template: '<div>Modal de login e registro</div>',
                    },
                    teleport: true,
                },
            },
        })
    })

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
                mockStore.state.isLogged = false
                await nextTick()
                const button = wrapper.find('[data-create]')
                await button.trigger('click')
                const modalRegister = wrapper.get('[data-modal="create"]')

                expect(wrapper.emitted().click).toBeTruthy()
                expect(modalRegister.attributes('open')).toBe('true')
            })

            test('Dado que o usuário precisa efetuar login quando clicar em "Entrar" então deve exibir um modal', async () => {
                mockStore.state.isLogged = false
                await nextTick()
                const button = wrapper.get('[data-login]')
                await button.trigger('click')
                const modalLogin = wrapper.get('[data-modal="login"]')

                expect(wrapper.emitted().click).toBeTruthy()
                expect(modalLogin.attributes('open')).toBe('true')
            })
        })
        describe('🐇 Navegação:', () => {
            test.skip('Dado o botão para página de Credenciais Quando clicado Então deve carregar a página', async () => {
                mockStore.state.isLogged = true
                await nextTick()
                const push = jest.spyOn(router, 'push')
                // const push = jest.fn()
                const button = wrapper.get('[data-button="credentials"]')
                await button.trigger('click')
                // await router.isReady()

                expect(push).toHaveBeenCalledTimes(1)
                expect(push).toHaveBeenCalledWith('/credentials')
            })
        })
    })
})
