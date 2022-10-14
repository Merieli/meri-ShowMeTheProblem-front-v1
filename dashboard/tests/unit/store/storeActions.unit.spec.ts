import { useStore } from '@/store'
import { Mutations } from '@/store/type-mutations'
import { createStore } from 'vuex'

// const store = useStore()

const token = '123absncsdjfksasd'

const store = createStore({
    state: {
      count: 0
    },
    mutations: {
        [Mutations.LOGIN_USER]()= jest.fn(),
    },
  })

test.only('Dado um token de usuário Quando executar o Login na Store Então o usuário deve ser definido como logado e possuir um Token', async () => {
    store.commit(Mutations.LOGIN_USER, token)

    expect(store.state.userLogged.token).toBe(token)
    expect(store.state.isLogged).toBe(true)
})
