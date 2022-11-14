import { StateStore } from './StateStore';

export interface GettersStore {
    currentComponent(state: StateStore): string;
}
