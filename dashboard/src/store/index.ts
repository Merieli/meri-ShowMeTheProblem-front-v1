import ApiClient from '../http-client/server.json'
import router from '../router/index'
import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import { INotification } from '@/interfaces/INotification'
import IUsers from '@/interfaces/IUser'
import IUserLogged from '@/interfaces/IUserLogged'
import axios from 'axios'
import { createStore } from 'vuex'

export interface EstadoStore {
    users: IUsers[]
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
        [Mutations.ADD_USER](state, user: IUsers) {
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
        [Actions.REGISTER_USER]({ commit }, user: IUsers) {
            return axios
                .post(ApiClient.user.register, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })
                .then((response) => commit(Mutations.ADD_USER, response.data))
        },
        [Actions.LOGIN_USER]({ commit, dispatch, state }, user: IUsers) {
            return axios
                .post(ApiClient.user.login, {
                    email: user.email,
                    password: user.password,
                })
                .then((response) => {
                    commit(Mutations.LOGIN_USER, response.data.token)
                    router.push('/feedbacks')
                })
                .catch((e) => console.log(e))
                .then(() => {
                    dispatch(Actions.GET_USER, state.userLogged.token)
                })
        },
        [Actions.GET_USER]({ commit }, token) {
            return axios
                .get(ApiClient.user.show, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => commit(Mutations.USER_LOGGED, response.data))
        },
    },
    modules: {},
})
