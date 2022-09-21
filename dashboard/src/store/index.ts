import useNotifier from '../hooks/notifier'
import router from '../router/index'
import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import { IEstadoStore, IUser, INotification, TypeOfNotification, TFeedback } from '@/interfaces'
import callApiClient from '@/services/callApiClient'
import { applyFiltersStructure } from '@/views/Feedbacks/module'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export const key: InjectionKey<Store<IEstadoStore>> = Symbol()

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
        hasErrors(state) {
            return state.hasErrors
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
        [Mutations.ADD_CONFIGURED_FILTERS](state, { data, typeActive }) {
            state.filters = data
            state.userLogged.feedbackFilters = applyFiltersStructure(data, typeActive)
        },
        [Mutations.ADD_FEEDBACKS](state, data) {
            state.userLogged.feedbacks = data
        },
        [Mutations.TOOGLE_LOADING](state, actual: boolean) {
            state.isLoading = actual
        },
        [Mutations.TOOGLE_ERROR](state, error) {
            state.hasErrors = error ? true : false
        },
    },
    actions: {
        /**
         * @name REGISTER_USER
         * @descripton efetua o registro do usuário e o adiciona a store
         * @param {IUser} user usuário com name, email e password
         */
        async [Actions.REGISTER_USER]({ commit }, user: IUser) {
            const { notify } = useNotifier()
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                if (user.name != '' && user.email != '' && user.password != '') {
                    const response = await callApiClient.user.register(user.name, user.email, user.password)
                    commit(Mutations.ADD_USER, response)
                }
                notify(
                    TypeOfNotification.SUCESSO,
                    'Conta Registrada',
                    'Sua conta foi criada com sucesso, efetue login.'
                )
            } catch (error) {
                commit(Mutations.TOOGLE_ERROR, error)
                notify(TypeOfNotification.FALHA, 'Preencha todos os campos', 'Erro na tentativa de criar uma conta.')
                throw new Error(`Não foi possível efetuar cadastro. Confira os dados informados`)
            } finally {
                commit(Mutations.TOOGLE_LOADING, false)
            }
        },

        /**
         * @name LOGIN_USER
         * @description Efetua login do usuário, salva o token na store,
         * redireciona para a página de 'feedbacks' e aciona a action
         * para pegar os dados do usuário logado.
         * @param {IUser} user usuário com name, email e password
         */
        async [Actions.LOGIN_USER]({ commit, dispatch }, user: IUser) {
            const { notify } = useNotifier()
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                const response = await callApiClient.user.login(user.email, user.password)
                window.localStorage.setItem('token', response.token)
                dispatch(Actions.GET_USER)
                router.push('/feedbacks')
                notify(TypeOfNotification.SUCESSO, '', 'Login efetuado com sucesso.')
            } catch (error) {
                commit(Mutations.TOOGLE_ERROR, error)
                notify(TypeOfNotification.FALHA, 'Não foi possível efetuar login', 'Confira os dados informados.')
                throw new Error(`Não foi possível efetuar login. Confira os dados informados`)
            } finally {
                commit(Mutations.TOOGLE_LOADING, false)
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
            } catch (error) {
                commit(Mutations.TOOGLE_ERROR, error)
                throw new Error(`Não foi possível capturar os dados do usuário.`)
            } finally {
                commit(Mutations.TOOGLE_LOADING, false)
            }
        },

        /**
         * @name LOGGOUT_USER
         * @descripton faz o usuário ser deslogado
         */
        async [Actions.LOGGOUT_USER]({ commit }) {
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                window.localStorage.removeItem('token')
                commit(Mutations.LOGGOUT_USER)
                router.push({ name: 'home' })
            } catch (error) {
                commit(Mutations.TOOGLE_ERROR, error)
                throw new Error(`Não foi possível efetuar o loggout do usuário.`)
            } finally {
                commit(Mutations.TOOGLE_LOADING, false)
            }
        },

        /**
         * @name GENERATE_NEW_KEY
         * @descripton gera uma nova chave de api para o usuário e a salva na store
         */
        async [Actions.GENERATE_NEW_KEY]({ commit }) {
            const { notify } = useNotifier()
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                const token = window.localStorage.getItem('token') || ''
                const response = await callApiClient.user.generateNewKey(token)
                commit(Mutations.SAVE_NEW_KEY, response)
            } catch (error) {
                commit(Mutations.TOOGLE_ERROR, error)
                notify(TypeOfNotification.FALHA, 'Não foi possível gerar uma nova chave de api', '')
                throw new Error(`Não foi possível efetuar o loggout do usuário.`)
            } finally {
                commit(Mutations.TOOGLE_LOADING, false)
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

        /**
         * @name GET_SUMMARY_FEEDBACK
         * @descripton pega a quantidade de cada tipo de feedback e salva na store
         * configurando para exibir os filtros da listagem
         */
        async [Actions.GET_SUMMARY_FEEDBACK]({ commit, state }) {
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                commit(Mutations.TOOGLE_ERROR, undefined)
                const response = await callApiClient.feedback.showFilters(state.userLogged.token)
                commit(Mutations.ADD_CONFIGURED_FILTERS, { data: response })
            } catch (error) {
                commit(Mutations.TOOGLE_ERROR, error)
                commit(Mutations.ADD_CONFIGURED_FILTERS, { data: { all: 0, issue: 0, idea: 0, other: 0 } })
                throw new Error(`Não foi possível capturar os filtros dos feedbacks do usuário atual.`)
            } finally {
                commit(Mutations.TOOGLE_LOADING, false)
            }
        },

        /**
         * @name CHANGE_ACTIVE_FEEDBACK
         * @descripton altera o tipo de feedback ativo
         * @param {TFeedback} type tipo do feedback retornado
         */
        async [Actions.CHANGE_ACTIVE_FEEDBACK]({ commit, state }, type?: TFeedback) {
            try {
                commit(Mutations.ADD_CONFIGURED_FILTERS, { data: state.filters, typeActive: type })
            } catch (error) {
                commit(Mutations.TOOGLE_ERROR, error)
                state.isLoading = false
                throw new Error(`Não foi possível alterar o filtro dos feedbacks ativos.`)
            }
        },

        async [Actions.GET_ALL_FEEDBACKS]({ commit, state }, { type, limit = '', offset = '' }) {
            try {
                commit(Mutations.TOOGLE_LOADING, true)
                const token = state.userLogged.token
                const response = await callApiClient.feedback.show(token, type, limit, offset)
                commit(Mutations.ADD_FEEDBACKS, response.results)
                console.log(`feedbacks na store: `, state.userLogged.feedbacks)
            } catch (error) {
                const { notify } = useNotifier()
                commit(Mutations.TOOGLE_ERROR, error)
                notify(TypeOfNotification.FALHA, 'Não foi possível carregar os feedbacks!', '')
                throw new Error(`Não foi possível capturar os feedbacks do usuário.`)
            } finally {
                commit(Mutations.TOOGLE_LOADING, false)
            }
        },
    },
    modules: {},
})

export function useStore(): Store<IEstadoStore> {
    return baseUseStore(key)
}
