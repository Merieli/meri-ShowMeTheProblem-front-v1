import { Actions } from '@/store/Actions';
import { ActionContext, ActionTree } from 'vuex';
import { StateStore } from './StateStore';

type Context = ActionContext<StateStore, StateStore>;

export interface ActionsStore extends ActionTree<StateStore, StateStore> {
    [Actions.SAVE_FEEDBACK]: (context: Context, feedback: string) => Promise<void>;
}
