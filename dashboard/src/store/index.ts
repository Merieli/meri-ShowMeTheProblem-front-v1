import { Actions } from './type-actions'
import { Mutations } from './type-mutations'
import useNotifier from '@/hooks/notifier'
import repositories from '@/http/repositories'
import {
    StateStoreShape,
    IUser,
    INotification,
    TypeOfNotification,
    TFeedback,
    IFeedbacksPagination,
    IFeedback,
    IUserLogged,
    MutationsStore,
    ActionsStore,
} from '@/interfaces'
import router from '@/router/index'
import { applyFiltersStructure } from '@/views/Feedbacks/module'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

export const state: StateStoreShape = {
    users: [],
    notifications: [],
    isLogged: false,
    userLogged: {
        name: '',
        token: '',
        apiKey: '',
    },
    feedbacks: {
        data: [],
        filters: [],
        pagination: {
            limit: 4,
            offset: 0,
            total: 0,
        },
        currentType: 'all',
    },
    filters: {
        all: 0,
        idea: 0,
        issue: 0,
        other: 0,
    },
    isLoading: false,
    hasErrors: false,
}

export const getters = {
    notifications(state: StateStoreShape) {
        return state.notifications
    },
    feedbacks(state: StateStoreShape) {
        return state.feedbacks.data
    },
    feedbackFilters(state: StateStoreShape) {
        return state.feedbacks.filters
    },
    feedbackCurrentType(state: StateStoreShape) {
        return state.feedbacks.currentType
    },
    isLoading(state: StateStoreShape) {
        return state.isLoading
    },
    getApiKey(state: StateStoreShape) {
        return state.userLogged.apiKey
    },
    hasErrors(state: StateStoreShape) {
        return state.hasErrors
    },
    paginationFeedbacksLimit(state: StateStoreShape) {
        return state.feedbacks.pagination.limit
    },
    paginationFeedbacksTotal(state: StateStoreShape) {
        return state.feedbacks.pagination.total
    },
    paginationFeedbacksOffset(state: StateStoreShape) {
        return state.feedbacks.pagination.offset
    },
}

export const mutations: MutationsStore = {
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
        state.hasErrors = false
        state.userLogged.name = ''
        state.userLogged.apiKey = ''
        state.userLogged.token = ''
        state.feedbacks.data = []
        state.feedbacks.filters = []
        state.feedbacks.currentType = 'all'
    },
    [Mutations.USER_LOGGED](state, data: IUserLogged) {
        state.userLogged.name = data.name
        state.userLogged.apiKey = data.apiKey
    },
    [Mutations.ADD_CONFIGURED_FILTERS](state, { data, typeActive }) {
        state.filters = data
        state.feedbacks.filters = applyFiltersStructure(data, typeActive)
    },
    [Mutations.ADD_FEEDBACKS](state, data: IFeedback[]) {
        data.forEach((feedback: IFeedback) => {
            state.feedbacks.data.push(feedback)
        })
    },
    [Mutations.CLEAR_FEEDBACKS](state) {
        state.feedbacks.data = []
    },
    [Mutations.CLEAR_PAGINATION_FEEDBACKS](state) {
        state.feedbacks.pagination.offset = 0
        state.feedbacks.pagination.total = 0
    },
    [Mutations.ADD_CURRENT_FEEDBACK_TYPE](state, type: string) {
        state.feedbacks.currentType = type
    },
    [Mutations.ADD_PAGINATION_FEEDBACKS](state, data: IFeedbacksPagination) {
        state.feedbacks.pagination.limit = data.limit
        state.feedbacks.pagination.offset = data.offset
        state.feedbacks.pagination.total = data.total
    },
    [Mutations.TOOGLE_LOADING](state, actual: boolean) {
        state.isLoading = actual
    },
    [Mutations.TOOGLE_ERROR](state, error) {
        state.hasErrors = error ? true : false
    },
}

export const actions: ActionsStore = {
    async [Actions.REGISTER_USER]({ commit }, user: IUser) {
        const { notify } = useNotifier()
        try {
            commit(Mutations.TOOGLE_LOADING, true)
            const response = await repositories.user.register(user.name, user.email, user.password)
            commit(Mutations.ADD_USER, response)
            notify(TypeOfNotification.SUCESSO, 'Conta Registrada', 'Sua conta foi criada com sucesso, efetue login.')
        } catch (error) {
            commit(Mutations.TOOGLE_ERROR, error)
            notify(TypeOfNotification.FALHA, 'Preencha todos os campos', 'Erro na tentativa de criar uma conta.')
            throw new Error(`Não foi possível efetuar cadastro. Confira os dados informados`)
        } finally {
            commit(Mutations.TOOGLE_LOADING, false)
        }
    },

    async [Actions.LOGIN_USER]({ commit, dispatch }, user: IUser) {
        const { notify } = useNotifier()
        try {
            commit(Mutations.TOOGLE_LOADING, true)
            const response = await repositories.user.login(user.email, user.password)
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
            const user = await repositories.user.findByToken(token)
            commit(Mutations.USER_LOGGED, user)
        } catch (error) {
            commit(Mutations.TOOGLE_ERROR, error)
            throw new Error(`Não foi possível capturar os dados do usuário.`)
        } finally {
            commit(Mutations.TOOGLE_LOADING, false)
        }
    },

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

    async [Actions.GENERATE_NEW_KEY]({ commit }) {
        const { notify } = useNotifier()
        try {
            commit(Mutations.TOOGLE_LOADING, true)
            const token = window.localStorage.getItem('token') || ''
            const response = await repositories.user.generateNewKey(token)
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

    async [Actions.GET_SUMMARY_FEEDBACK]({ commit, state }) {
        try {
            commit(Mutations.TOOGLE_LOADING, true)
            const response = await repositories.feedback.showFilters(state.userLogged.token)
            commit(Mutations.ADD_CONFIGURED_FILTERS, { data: response })
        } catch (error) {
            commit(Mutations.TOOGLE_ERROR, error)
            commit(Mutations.ADD_CONFIGURED_FILTERS, { data: { all: 0, issue: 0, idea: 0, other: 0 } })
            throw new Error(`Não foi possível capturar os filtros dos feedbacks do usuário atual.`)
        } finally {
            commit(Mutations.TOOGLE_LOADING, false)
        }
    },

    async [Actions.CHANGE_ACTIVE_FEEDBACK]({ commit, state }, type: TFeedback) {
        try {
            commit(Mutations.ADD_CURRENT_FEEDBACK_TYPE, type)
            commit(Mutations.ADD_CONFIGURED_FILTERS, { data: state.filters, typeActive: type })
        } catch (error) {
            commit(Mutations.TOOGLE_ERROR, error)
            state.isLoading = false
            throw new Error(`Não foi possível alterar o filtro dos feedbacks ativos.`)
        }
    },

    async [Actions.GET_ALL_FEEDBACKS]({ commit, state }, { type, limit, offset }) {
        try {
            commit(Mutations.TOOGLE_LOADING, true)
            const notAllFeedbackSaved =
                state.feedbacks.data.length < state.feedbacks.pagination.total || state.feedbacks.data.length == 0

            const isNewTypeFeedback = type != state.feedbacks.currentType

            if (notAllFeedbackSaved || isNewTypeFeedback) {
                const token = state.userLogged.token
                if (isNewTypeFeedback) {
                    commit(Mutations.CLEAR_FEEDBACKS)
                    commit(Mutations.CLEAR_PAGINATION_FEEDBACKS)
                }

                const response = await repositories.feedback.show(token, type, limit, offset)

                commit(Mutations.ADD_FEEDBACKS, response.results)
                commit(Mutations.ADD_PAGINATION_FEEDBACKS, response.pagination)
                commit(Mutations.ADD_CURRENT_FEEDBACK_TYPE, type)
            }
        } catch (error) {
            const { notify } = useNotifier()
            commit(Mutations.TOOGLE_ERROR, error)
            notify(TypeOfNotification.FALHA, 'Não foi possível carregar os feedbacks!', '')
            throw new Error(`Não foi possível capturar os feedbacks do usuário.`)
        } finally {
            commit(Mutations.TOOGLE_LOADING, false)
        }
    },
}

export const store = createStore<StateStoreShape>({
    state,
    getters,
    mutations,
    actions,
})

export const key: InjectionKey<Store<StateStoreShape>> = Symbol()

export function useStore(): Store<StateStoreShape> {
    return baseUseStore(key)
}
