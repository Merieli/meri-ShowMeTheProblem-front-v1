import useNotifier from '../hooks/notifier'
import router from '../router/index'
import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import { IEstadoStore, IUser, INotification, TypeOfNotification, TFeedback, IFeedbackFilters } from '@/interfaces'
import callApiClient from '@/services/callApiClient'
import { applyFiltersStructure } from '@/views/Feedbacks/module'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export const key: InjectionKey<Store<IEstadoStore>> = Symbol()

const tokenTesteApi =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhYjc1OWY4LWYyMzgtNGZmOS1hZTkxLWVlMTU1ODk4MjMyOSIsImVtYWlsIjoiaWdvckBpZ29yLm1lIiwibmFtZSI6Iklnb3IgSGFsZmVsZCIsImlhdCI6MTYxMDc0MzgyNn0.2R-hm8yCSAtpcvniI1R9CNF_ZzguRaMZoU2pTrwijds'

export const store = createStore<IEstadoStore>({
    state: {
        users: [],
        notifications: [],
        isLogged: false,
        userLogged: {
            name: '',
            token: '',
            apiKey: '',
            feedbackFilters: [],
            feedbacks: [],
        },
        filters: {
            all: 0,
            idea: 0,
            issue: 0,
            other: 0,
        },
        isLoading: false,
        hasErrors: false,
    },
    getters: {
        notifications(state) {
            return state.notifications
        },
        feedbacks(state) {
            return state.userLogged.feedbacks
        },
        feedbackFilters(state) {
            return state.userLogged.feedbackFilters
        },
        isLoading(state) {
            return state.isLoading
        },
        getApiKey(state) {
            return state.userLogged.apiKey
        },
    },
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
        [Mutations.LOGIN_USER](state, token: string) {
            state.userLogged.token = token
            state.isLogged = true
        },
        [Mutations.SAVE_NEW_KEY](state, newKey: string) {
            state.userLogged.apiKey = newKey
        },
        [Mutations.LOGGOUT_USER](state) {
            state.userLogged.token = ''
            state.isLogged = false
            state.userLogged.name = ''
            state.userLogged.apiKey = ''
        },
        [Mutations.USER_LOGGED](state, data) {
            state.userLogged.name = data.name
            state.userLogged.apiKey = data.apiKey
        },
        [Mutations.ADD_FILTERS](state, data: IFeedbackFilters) {
            state.filters = data
        },
        [Mutations.ADD_CONFIGURED_FILTERS](state, { data, typeActive }) {
            state.userLogged.feedbackFilters = applyFiltersStructure(data, typeActive)
        },
        [Mutations.ADD_FEEDBACKS](state, data) {
            state.userLogged.feedbacks = data
        },
        [Mutations.TOOGLE_LOADING](state, actual: boolean) {
            state.isLoading = actual
        },
    },
    actions: {
        /**
         * @name REGISTER_USER
         * @descripton efetua o registro do usuário e o adiciona a store
         * @param {IUser} user usuário com name, email e password
         */
        async [Actions.REGISTER_USER]({ commit, state }, user: IUser) {
            const { notify } = useNotifier()
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                if (user.name != '' && user.email != '' && user.password != '') {
                    const response = await callApiClient.user.register(user.name, user.email, user.password)
                    commit(Mutations.ADD_USER, response)
                }
                commit(Mutations.TOOGLE_LOADING, false)
                notify(
                    TypeOfNotification.SUCESSO,
                    'Conta Registrada',
                    'Sua conta foi criada com sucesso, efetue login.'
                )
            } catch (error) {
                commit(Mutations.TOOGLE_LOADING, false)
                state.hasErrors = !!error
                notify(TypeOfNotification.FALHA, 'Preencha todos os campos', 'Erro na tentativa de criar uma conta.')
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
            const { notify } = useNotifier()
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                const response = await callApiClient.user.login(user.email, user.password)
                window.localStorage.setItem('token', response.token)
                dispatch(Actions.GET_USER)

                // if (!errors) {
                // }
                router.push('/feedbacks')

                notify(TypeOfNotification.SUCESSO, '', 'Login efetuado com sucesso.')
                commit(Mutations.TOOGLE_LOADING, false)
            } catch (error) {
                commit(Mutations.TOOGLE_LOADING, false)
                state.hasErrors = !!error
                notify(TypeOfNotification.FALHA, 'Não foi possível efetuar login', 'Confira os dados informados.')
                throw new Error(`Não foi possível efetuar login. Confira os dados informados`)
            }
        },

        /**
         * @name GET_USER
         * @descripton Captura os dados do usuário, ou efetua o login se já tiver um
         * token de usuário salvo, armazenando os dados na store
         */
        async [Actions.GET_USER]({ commit, state }) {
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                let token
                const tokenStorage = window.localStorage.getItem('token')

                if (!tokenStorage) {
                    token = state.userLogged.token
                } else {
                    token = tokenStorage
                    commit(Mutations.LOGIN_USER, token)
                }
                const response = await callApiClient.user.show(token)
                commit(Mutations.USER_LOGGED, response)
                commit(Mutations.TOOGLE_LOADING, false)
            } catch (error) {
                commit(Mutations.TOOGLE_LOADING, false)
                state.hasErrors = !!error
                throw new Error(`Não foi possível capturar os dados do usuário.`)
            }
        },

        async [Actions.LOGGOUT_USER]({ commit, state }) {
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                window.localStorage.removeItem('token')
                commit(Mutations.LOGGOUT_USER)
                router.push({ name: 'home' })
                commit(Mutations.TOOGLE_LOADING, false)
            } catch (error) {
                commit(Mutations.TOOGLE_LOADING, false)
                state.hasErrors = !!error
                throw new Error(`Não foi possível efetuar o loggout do usuário.`)
            }
        },

        async [Actions.GENERATE_NEW_KEY]({ commit, state }) {
            const { notify } = useNotifier()
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                const token = window.localStorage.getItem('token') || ''
                const response = await callApiClient.user.generateNewKey(token)
                commit(Mutations.SAVE_NEW_KEY, response)
                commit(Mutations.TOOGLE_LOADING, false)
            } catch (error) {
                commit(Mutations.TOOGLE_LOADING, false)
                state.hasErrors = !!error
                notify(TypeOfNotification.FALHA, 'Não foi possível gerar uma nova chave de api', '')
                throw new Error(`Não foi possível efetuar o loggout do usuário.`)
            }
        },

        async [Actions.HANDLE_COPY_TEXT](context, text: string) {
            const { notify } = useNotifier()
            try {
                await navigator.clipboard.writeText(text)
                notify(TypeOfNotification.SUCESSO, 'Copiado!', '')
            } catch (error) {
                notify(TypeOfNotification.FALHA, 'Não foi possível copiar!', '')
                throw new Error(`Erro ao copiar.`)
            }
        },

        async [Actions.GET_INDEX_FEEDBACK]({ commit, state }) {
            try {
                // state.isLoading = true
                commit(Mutations.TOOGLE_LOADING, true)
                // Substituir o tokenTesteApi pelo token do usuario logado depois "this.state.userLogged.token"
                const response = await callApiClient.feedback.showFilters(tokenTesteApi)
                console.log(response)

                commit(Mutations.ADD_FILTERS, response)
                commit(Mutations.ADD_CONFIGURED_FILTERS, { data: response })

                console.log(state.isLoading)
                commit(Mutations.TOOGLE_LOADING, false)
                console.log(state.isLoading)
                // state.isLoading = false
            } catch (error) {
                state.hasErrors = !!error
                commit(Mutations.TOOGLE_LOADING, false)
                commit(Mutations.ADD_FILTERS, { data: { all: 0, issue: 0, idea: 0, other: 0 } })
                throw new Error(`Não foi possível capturar os filtros dos feedbacks do usuário atual.`)
            }
        },

        async [Actions.CHANGE_ACTIVE_FEEDBACK]({ commit, state }, type?: TFeedback) {
            try {
                commit(Mutations.ADD_CONFIGURED_FILTERS, { data: state.filters, typeActive: type })
            } catch (error) {
                state.hasErrors = !!error
                state.isLoading = false
                throw new Error(`Não foi possível alterar o filtro dos feedbacks ativos.`)
            }
        },

        async [Actions.GET_ALL_FEEDBACKS]({ commit, state }, { type, limit, offset }) {
            try {
                // commit(Mutations.TOOGLE_LOADING, true)
                // Substituir o tokenTesteApi pelo token do usuario logado depois "this.state.userLogged.token"
                const response = await callApiClient.feedback.show(tokenTesteApi, type, limit, offset)
                commit(Mutations.ADD_FEEDBACKS, response.results)
                // commit(Mutations.TOOGLE_LOADING, false)
            } catch (error) {
                state.hasErrors = !!error
                // state.isLoading = false
                throw new Error(`Não foi possível capturar os feedbacks do usuário.`)
            }
        },
    },
    modules: {},
})

export function useStore(): Store<IEstadoStore> {
    return baseUseStore(key)
}
