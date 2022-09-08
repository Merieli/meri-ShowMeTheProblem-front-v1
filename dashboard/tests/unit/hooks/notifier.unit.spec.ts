import useNotifier from '@/hooks/notifier'
import { TypeOfNotification } from '@/interfaces'
import { createStore } from 'vuex'

describe('Notify', () => {
    const mockState = jest.fn()
    const mockMutations = {
        NOTIFY: jest.fn(),
    }

    beforeEach(() => {
        const store = createStore({
            state: mockState,
            mutations: mockMutations,
        })
    })

    describe('Unidade:', () => {
        test('Dado a função quando utilizada então comete uma mutação do tipo NOTIFY', async () => {
            // const { notify } = useNotifier()
            // notify(1, 'Preencha todos os campos', 'Erro na tentativa de criar uma conta.')
            // expect(mockMutations.NOTIFY.mock.calls).toHaveLength(1)
        })
    })
})
