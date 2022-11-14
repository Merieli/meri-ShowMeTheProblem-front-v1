import { Mutations } from '@/store/Mutations';
import { StateStore } from './StateStore';

export interface MutationsStore {
    [Mutations.SET_CURRENT_COMPONENT](state: StateStore, componentName: string): void;
    [Mutations.SET_MESSAGE](state: StateStore, message: string): void;
    [Mutations.SET_FEEDBACK_TYPE](state: StateStore, type: string): void;
    [Mutations.SET_CURRENT_PAGE](state: StateStore, page: string): void;
    [Mutations.SET_APIKEY](state: StateStore, apiKey: string): void;
    [Mutations.SET_FINGERPRINT](state: StateStore, fingerprint: string): void;
    [Mutations.RESET_STORE](state: StateStore): void;
}
