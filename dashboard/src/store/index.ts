import ApiClient from '../http-client/server.json'
import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import { INotification, TypeOfNotification } from '@/interfaces/INotification'
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
        notifications: [
            {
                id: 1,
                title: 'Sucesso',
                text: 'Uma notificação de sucesso',
                type: TypeOfNotification.SUCESSO,
            },
            {
                id: 2,
                title: 'Atenção',
                text: 'Uma notificação de atenção',
                type: TypeOfNotification.ATENCAO,
            },
            {
                id: 3,
                title: 'Falha',
                text: 'Uma notificação de falha',
                type: TypeOfNotification.FALHA,
            },
        ],
    },
    getters: {},
    mutations: {
        [Mutations.NOTIFY](state, actualNotification: INotification) {
            actualNotification.id = new Date().getTime()
            state.notifications.push(actualNotification)

            // setTimeout(() => {}, 3000)
            setTimeout(() => {
                state.notifications = state.notifications.filter((not) => not.id != actualNotification.id)
            }, 3000)
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
