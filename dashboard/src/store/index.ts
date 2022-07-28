import ApiClient from '../http-client/server.json'
import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import { INotification } from '@/interfaces/INotification'
import IUsers from '@/interfaces/IUser'
import axios from 'axios'
import { createStore } from 'vuex'

export interface EstadoStore {
    users: IUsers[]
    notifications: INotification[]
}

export const store = createStore<EstadoStore>({
    state: {
        users: [],
        notifications: [],
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
            console.log(state.users)
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
    },
    modules: {},
})
