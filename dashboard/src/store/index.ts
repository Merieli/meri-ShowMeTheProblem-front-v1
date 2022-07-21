import ApiClient from '../http-client/server.json'
import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import IUsers from '@/interfaces/IUser'
import axios from 'axios'
import { createStore } from 'vuex'

export interface EstadoStore {
    users: IUsers[]
}

export const store = createStore<EstadoStore>({
    state: {
        users: [],
    },
    getters: {},
    mutations: {
        [Mutations.ADD_USER](state, user: IUsers) {
            state.users.push(user)
        },
    },
    actions: {
        [Actions.REGISTER_USER](state, user: IUsers) {
            return axios
                .post(ApiClient.user.register, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })
                .then((res) => {
                    console.log(res)
                })
        },
    },
    modules: {},
})
