import { GetterTree } from 'vuex';
import { StateStore } from './StateStore';

export interface GettersStore extends GetterTree<StateStore, StateStore> {
    currentComponent(state: StateStore): string;
    feedbackType(state: StateStore): string;
}
