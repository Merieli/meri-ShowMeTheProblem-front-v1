import http from '../http'
import IUsers from '@/interfaces/IUser'
import { createStore, Store, useStore } from 'vuex'

export interface EstadoStore {
    users: IUsers[]
}

export const store = createStore<EstadoStore>({
    state: {
        users: [],
    },
    getters: {},
    mutations: {},
    actions: {
        REGISTER_USER({ commit }, user: IUsers) {
            return http.
        },
    },
    modules: {},
})
