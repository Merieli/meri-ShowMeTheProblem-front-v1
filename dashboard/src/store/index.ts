import ApiClient from '../http-client/server.json'
import IUsers from '@/interfaces/IUser'
import axios from 'axios'
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
            return axios.get(ApiClient.user.create).then((res) => {
                console.log(res)
            })
        },
    },
    modules: {},
})
