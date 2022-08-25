import useNotifier from '../hooks/notifier'
import router from '../router/index'
import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import callApiClient from '@/http-client/index'
import { TypeOfNotification } from '@/interfaces/INotification'
import { INotification } from '@/interfaces/INotification'
import IUser from '@/interfaces/IUser'
import IUserLogged from '@/interfaces/IUserLogged'
import { createStore } from 'vuex'

export interface EstadoStore {
    users: IUser[]
    notifications: INotification[]
    isLogged: boolean
    userLogged: IUserLogged
}

export const store = createStore<EstadoStore>({
    state: {
        users: [],
        notifications: [],
        isLogged: false,
        userLogged: {
            name: '',
            token: '',
            apiKey: '',
        },
    },
    getters: {},
    mutations: {
        [Mutations.NOTIFY](state, newNotification: INotification) {
            newNotification.id = new Date().getTime()
            state.notifications.push(newNotification)
            setTimeout(() => {
                state.notifications = state.notifications.filter((notif) => notif.id != newNotification.id)
            }, 5000)
        },
        [Mutations.ADD_USER](state, user: IUser) {
            state.users.push(user)
        },
        [Mutations.LOGIN_USER](state, token) {
            state.userLogged.token = token
            state.isLogged = true
        },
        [Mutations.USER_LOGGED](state, data) {
            state.userLogged.name = data.name
            state.userLogged.apiKey = data.apiKey
        },
    },
    actions: {
        /**
         * @name REGISTER_USER
         * @descripton efetua o registro do usuário e o adiciona a store
         * @param {IUser} user usuário com name, email e password
         */
        async [Actions.REGISTER_USER]({ commit }, user: IUser) {
            try {
                const response = await callApiClient.user.register(user.name, user.email, user.password)
                commit(Mutations.ADD_USER, response)
            } catch (e) {
                throw new Error(`Não foi possível efetuar cadastro. Confira os dados informados`)
            }
        },

        /**
         * @name LOGIN_USER
         * @description Efetua login do usuário, salva o token na store,
         * redireciona para a página de 'feedbacks' e aciona a action
         * para pegar os dados do usuário logado.
         * @param {IUser} user usuário com name, email e password
         */
        async [Actions.LOGIN_USER]({ commit, dispatch, state }, user: IUser) {
            try {
                const response = await callApiClient.user.login(user.email, user.password)
                commit(Mutations.LOGIN_USER, response.token)
                router.push('/feedbacks')
                dispatch(Actions.GET_USER, state.userLogged.token)
            } catch (e) {
                const { notify } = useNotifier()
                notify(TypeOfNotification.FALHA, 'Não foi possível efetuar login', 'Confira os dados informados.')
                throw new Error(`Não foi possível efetuar login. Confira os dados informados`)
            }
        },

        /**
         * @name GET_USER
         * @descripton Captura os dados do usuários e salva na store
         * @param token chave de acesso do usuário
         */
        async [Actions.GET_USER]({ commit }, token) {
            try {
                const response = await callApiClient.user.show(token)
                commit(Mutations.USER_LOGGED, response)
            } catch (e) {
                throw new Error(`Não foi possível capturar os dados do usuário.`)
            }
        },
    },
    modules: {},
})
