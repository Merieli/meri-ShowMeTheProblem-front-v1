import GeralHeader from '@/components/GeralHeader.vue'
import PartModal from '@/components/Modal/index.vue'
import { routes } from '@/router'
import { key } from '@/store'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'

describe('GeralHeader', () => {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

    let wrapper: VueWrapper

    const store = createStore({
        state() {
            return {
                users: [],
            }
        },
        mutations: {
            REGISTER_USER() {
                return
            },
        },
    })

    beforeEach(async () => {
        router.push('./')
        await router.isReady()

        wrapper = shallowMount(GeralHeader, {
            // attachTo: document.body,
            global: {
                plugins: [[router], [store, key]],
                // components: {
                //     PartModal,
                // },
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
        document.body.outerHTML = ''
    })

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente quando for montado deve ser uma instancia vue', () => {
                expect(wrapper.vm).toBeDefined()
            })
        })
        describe('🧠 Comportamento:', () => {
            test('Dado que o usuário precisa criar uma conta quando clicar em "Crie uma conta" então deve exibir um modal', async () => {
                await wrapper.get('[data-create]').trigger('click')

                expect(wrapper.emitted().click).toBeTruthy()
                expect(wrapper.findComponent(PartModal)).toBeTruthy()
            })

            test('Dado que o usuário precisa efetuar login quando clicar em "Entrar" então deve exibir um modal', async () => {
                await wrapper.get('[data-login]').trigger('click')

                expect(wrapper.emitted().click).toBeTruthy()
                expect(wrapper.findComponent(PartModal)).toBeTruthy()
            })
        })
        describe('🐕 Navegação:', () => {
            it('deveria abrir a rota "Credentials" ao efetuar login', () => {
                return
            })
        })
    })
})
