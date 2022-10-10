import { useStore } from '@/store'
import { Mutations } from '@/store/type-mutations'

/**
 * @jest-environment jsdom
 */
const store = useStore()

const token = '123absncsdjfksasd'

test('Dado um token de usuário Quando executar o Login na Store Então o usuário deve ser definido como logado e possuir um Token', async () => {
    store.commit(Mutations.LOGIN_USER, token)

    expect(store.state.userLogged.token).toBe(token)
    expect(store.state.isLogged).toBe(true)
})
