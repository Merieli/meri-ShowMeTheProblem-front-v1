import BaseButton from '@/components/BaseButton/index.vue'
import { ButtonColors, ButtonTypes } from '@/components/BaseButton/module'
import { mount, VueWrapper } from '@vue/test-utils'

describe('BaseButton', () => {
    let wrapper: VueWrapper

    beforeEach(() => {
        wrapper = mount(BaseButton, {
            slots: {
                default: 'Ação X',
            },
            props: {},
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    describe('Integração/Componente', () => {
        describe('Renderização:', () => {
            test('Dado o componente quando for montado então deve ser uma instancia vue', async () => {
                expect(wrapper.vm).toBeDefined()
            })

            test('Dado o preenchimento do slot quando definido um texto "Ação X" então exibe esse texto no componente', async () => {
                const button = wrapper.find('button.base-button')

                expect(button.html()).toContain('Ação X')
            })

            test('Dado a prop color quando definida como "dark" então possui a classe "base-button_dark"', async () => {
                await wrapper.setProps({ color: ButtonColors.DARK })

                expect(wrapper.classes()).toContain('base-button_dark')
            })

            test('Dado a prop color quando definida como "light" então possui a classe "base-button_light"', async () => {
                await wrapper.setProps({ color: ButtonColors.LIGHT })

                expect(wrapper.classes()).toContain('base-button_light')
            })

            test('Dado a prop typeButton quando definida como "submit" então o botão deve ter o type "submit"', async () => {
                await wrapper.setProps({ typeButton: ButtonTypes.SUBMIT })

                expect(wrapper.attributes('type')).toContain(ButtonTypes.SUBMIT)
            })
        })
    })
})
