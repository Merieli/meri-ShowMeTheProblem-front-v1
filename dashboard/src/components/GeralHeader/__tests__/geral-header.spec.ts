import GeralHeader from '@/components/GeralHeader.vue'
import PartModal from '@/components/Modal/index.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { createStore } from 'vuex'

describe('GeralHeader', () => {
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

    beforeAll(() => {
        wrapper = mount(GeralHeader, {
            attachTo: document.body,
            global: {
                plugins: [store],
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
        document.body.outerHTML = ''
    })

    it('deveria exibir um modal quando clicar em "Crie uma conta"', async () => {
        await wrapper.get('[data-create]').trigger('click')

        expect(wrapper.emitted().click).toBeTruthy()
        //expect(wrapper.get('.modal')).toHaveLength(1)
    })

    //Testes de Unidade:
    describe('Unidade', () => {
        test.only('Dado um campo de nome quando preenchido deve emitir o evento de input', async () => {
            await wrapper.find('[data-create]').trigger('click')

            const modal = wrapper.getComponent(PartModal)
            await modal.get('input').setValue('Merieli')
            //const inputName = wrapper.get('[data-form-name]')
            //await inputName.setValue('Merieli')
            //find('input[data-form-name]').setValue('Merieli')d
            expect(modal.emitted().input[0]).toBeTruthy()
            //expect(wrapper.emitted().input).toBeTruthy()
            //expect(wrapper.emitted().input[0]).toEqual('Merieli')
        })

        test('Dado o preenchimento do formulário para criar conta quando clicar em "Criar conta" deve criar um usuário e retornar uma notificação', async () => {
            // Atribuir valor para os dados name, email e password
            // Simular execuçao de createUser() com dados mock
            // Validar retorno da execuçao
            // Validar retorno da notificação
        })
    })

    describe('Componente', () => {
        describe('Renderização', () => {
            test('Dado o componente quando for montado deve ser uma instancia vue', () => {
                expect(wrapper.vm).toBeDefined()
            })
        })
        describe('Comportamento', () => {
            it('deveria exibir uma notificação ao efetuar login', () => {
                return
            })
        })
        describe('Navegação', () => {
            it('deveria abrir a rota "Credentials" ao efetuar login', () => {
                return
            })
        })
    })

    test('Dado um clique em "Criar conta" quando submeter o formulário deve criar um usuário', async () => {
        return
    })

    test('Dado um clique em "Criar conta" quando criar o usuário deve exibir uma notificação', () => {
        return
    })

    it('deveria efetuar login ao submeter o formulário clicando em "Entrar"', () => {
        return
    })
})
