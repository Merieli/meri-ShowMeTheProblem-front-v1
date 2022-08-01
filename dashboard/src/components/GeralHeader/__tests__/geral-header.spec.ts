import GeralHeader from '@/components/GeralHeader.vue'
import { shallowMount, VueWrapper } from '@vue/test-utils'
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

    beforeEach(() => {
        wrapper = shallowMount(GeralHeader, {
            global: {
                plugins: [store],
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
    })

    it('deveria exibir um modal quando clicar em "Crie uma conta"', async () => {
        await wrapper.get('[data-create]').trigger('click')

        expect(wrapper.emitted().click).toBeTruthy()
        expect(wrapper.findAll('.modal')).toHaveLength(1)
    })

    //Testes de Unidade:
    describe('Unidade', () => {
        test('Dado o componente quando for montado deve ser uma instancia vue', () => {
            expect(wrapper.vm).toBeDefined()
        })

        /*
        test('Dado um campo de name quando preenchido deve emitir o evento de input', async () => {
            const inputName = wrapper.find('#create-name')
            await inputName.setValue('Merieli')

            expect(wrapper.emitted().input).toBeTruthy()
            expect(wrapper.emitted().input[0]).toEqual('Merieli')
        })*/

        test('Dado o preenchimento do formulário para criar conta quando clicar em "Criar conta" deve criar um usuário e retornar uma notificação', async () => {
            // Atribuir valor para os dados name, email e password
            // Simular execuçao de createUser() com dados mock
            // Validar retorno da execuçao
            // Validar retorno da notificação
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

    it('deveria abrir a rota "Credentials" ao efetuar login', () => {
        return
    })

    it('deveria exibir uma notificação ao efetuar login', () => {
        return
    })
})
