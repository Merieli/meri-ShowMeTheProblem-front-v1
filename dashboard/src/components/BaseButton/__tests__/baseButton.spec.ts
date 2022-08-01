import BaseButton from '@/components/BaseButton/index.vue'
import { mount, VueWrapper } from '@vue/test-utils'

describe('BaseButton', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(BaseButton, {
            slots: {
                default: 'Ação X',
            },
            props: {
                color: 'dark',
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    describe('Unidade', () => {
        test('Dado o componente quando for montado deve ser uma instancia vue', async () => {
            expect(wrapper.vm).toBeDefined()
        })

        test('Dado o preenchimento do slot quando definido um texto "Ação X" deve retornar esse texto no componente', async () => {
            const button = wrapper.find('button.base-button')

            expect(button.html()).toContain('Ação X')
        })

        test.only('Dado a prop color quando definida como "dark" deve retornar a classe "base-button_dark"', async () => {
            expect(wrapper.find('.base-button_dark')).toBeTruthy()
        })
    })
})
