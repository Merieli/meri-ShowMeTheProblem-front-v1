import { FeedbackFiltersConfigure } from './FeedbackFiltersConfigure';
import { IFeedback } from './IFeedback';
import { IFeedbacksPagination } from './IFeedbacksPagination';
import { INotification } from './INotification';
import { IUser } from './IUser';
import { IUserLogged } from './IUserLogged';
import { StateStoreShape } from './StateStore';
import { Mutations } from '@/store/type-mutations';
import { MutationTree } from 'vuex';

export interface MutationsStore extends MutationTree<StateStoreShape> {
    [Mutations.NOTIFY](state: StateStoreShape, newNotification: INotification): void;

    [Mutations.ADD_USER](state: StateStoreShape, user: IUser): void;

    [Mutations.LOGIN_USER](state: StateStoreShape, token: string): void;

    [Mutations.SAVE_NEW_KEY](state: StateStoreShape, newKey: string): void;

    [Mutations.LOGGOUT_USER](state: StateStoreShape): void;

    [Mutations.USER_LOGGED](state: StateStoreShape, data: IUserLogged): void;

    [Mutations.ADD_CONFIGURED_FILTERS](state: StateStoreShape, configureFilter: FeedbackFiltersConfigure): void;

    [Mutations.ADD_FEEDBACKS](state: StateStoreShape, data: IFeedback[]): void;

    [Mutations.CLEAR_FEEDBACKS](state: StateStoreShape): void;

    [Mutations.CLEAR_PAGINATION_FEEDBACKS](state: StateStoreShape): void;

    [Mutations.ADD_CURRENT_FEEDBACK_TYPE](state: StateStoreShape, type: string): void;

    [Mutations.ADD_PAGINATION_FEEDBACKS](state: StateStoreShape, data: IFeedbacksPagination): void;

    [Mutations.TOOGLE_LOADING](state: StateStoreShape, actual: boolean): void;

    [Mutations.TOOGLE_ERROR](state: StateStoreShape, error: Error): void;
}
