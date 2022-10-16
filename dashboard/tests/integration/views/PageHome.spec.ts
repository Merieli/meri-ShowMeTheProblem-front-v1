import { routes } from '@/router'
import PageHome from '@/views/Home/PageHome.vue'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

describe('PageHome.vue', () => {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })

    let wrapper: VueWrapper

    beforeEach(async () => {
        router.push('./')
        await router.isReady()

        wrapper = shallowMount(PageHome, {
            global: {
                plugins: [router],
            },
        })
    })
    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', async () => {
                expect(wrapper.html()).toMatchSnapshot()
            })
        })
        describe('🧠 Comportamento:', () => {
            return
        })
        describe('🐕 Navegação:', () => {
            return
        })
    })
})
