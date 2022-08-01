import ApiClient from '../http-client/server.json'
import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import { INotification } from '@/interfaces/INotification'
import IUsers from '@/interfaces/IUser'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { createStore } from 'vuex'

export interface EstadoStore {
    users: IUsers[]
    notifications: INotification[]
    isLogged: boolean
    userLogged: string
}

export const store = createStore<EstadoStore>({
    state: {
        users: [],
        notifications: [],
        isLogged: false,
        userLogged: '',
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
        [Mutations.ADD_USER](state, user: IUsers) {
            state.users.push(user)
        },
        [Mutations.LOGIN_USER](state, token) {
            state.userLogged = token
            state.isLogged = true
        },
    },
    actions: {
        [Actions.REGISTER_USER]({ commit }, user: IUsers) {
            return axios
                .post(ApiClient.user.register, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })
                .then((response) => commit(Mutations.ADD_USER, response.data))
        },
        [Actions.LOGIN_USER]({ commit }, user: IUsers) {
            return axios
                .post(ApiClient.user.login, {
                    email: user.email,
                    password: user.password,
                })
                .then((response) => commit(Mutations.LOGIN_USER, response.data))
                .then(() => {
                    const router = useRouter()
                    router.push('/credencials')
                })
        },
        [Actions.GET_USER](state, token) {
            return axios.get(ApiClient.user.show, {
                params: {
                    Authorization: 'Bearer ' + token,
                },
            })
        },
    },
    modules: {},
})
