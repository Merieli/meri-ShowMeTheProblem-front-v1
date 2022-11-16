import httpClient from '@/http';
import { GettersStore, MutationsStore, StateStore } from '@/interfaces/';
import { ActionsStore } from '@/interfaces/ActionsStore';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { Actions } from './Actions';
import { Mutations } from './Mutations';

export const state: StateStore = {
    currentComponent: 'SelectFeedbackType',
    message: '',
    feedbackType: '',
    fingerprint: '',
    apiKey: '',
    currentPage: '',
};

export const mutations: MutationsStore = {
    [Mutations.SET_CURRENT_COMPONENT](state, componentName): void {
        state.currentComponent = componentName;
    },
    [Mutations.SET_MESSAGE](state, message): void {
        state.message = message;
    },
    [Mutations.SET_FEEDBACK_TYPE](state, type): void {
        state.feedbackType = type;
    },
    [Mutations.SET_CURRENT_PAGE](state, page): void {
        state.currentPage = page;
    },
    [Mutations.SET_APIKEY](state, apiKey): void {
        state.apiKey = apiKey;
    },
    [Mutations.SET_FINGERPRINT](state, fingerprint): void {
        state.fingerprint = fingerprint;
    },
    [Mutations.RESET_STORE](state): void {
        state.currentComponent = 'SelectFeedbackType';
        state.message = '';
        state.feedbackType = '';
        state.currentPage = '';
        state.apiKey = '';
        state.fingerprint = '';
    },
};

export const getters: GettersStore = {
    currentComponent(state): string {
        return state.currentComponent;
    },
    feedbackType(state): string {
        return state.feedbackType;
    },
};

export const actions: ActionsStore = {
    async [Actions.SAVE_FEEDBACK]({ state, commit }, feedback): Promise<void> {
        try {
            commit(Mutations.SET_MESSAGE, feedback);
            await httpClient.feedbacks.create({
                type: state.feedbackType,
                text: state.message,
                page: state.currentPage,
                apiKey: state.apiKey,
                device: window.navigator.userAgent,
                fingerprint: state.fingerprint,
            });
            commit(Mutations.SET_CURRENT_COMPONENT, 'SuccessSave');
        } catch (error) {
            commit(Mutations.SET_CURRENT_COMPONENT, 'ErrorSave');
            throw new Error('Não foi possível salvar o feedback!');
        }
    },
};

export const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {},
});

export const key: InjectionKey<Store<StateStore>> = Symbol();

export function useStore(): Store<StateStore> {
    return baseUseStore(key);
}
