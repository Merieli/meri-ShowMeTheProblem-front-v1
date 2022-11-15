import { FeedbackTypeAndPagination, IUser, StateStoreShape, TFeedback } from '.';
import { Actions } from '@/store/type-actions';
import { ActionContext, ActionTree } from 'vuex';

type Context = ActionContext<StateStoreShape, StateStoreShape>;

export interface ActionsStore extends ActionTree<StateStoreShape, StateStoreShape> {
    /**
     * @name REGISTER_USER
     * @descripton efetua o registro do usuário e o adiciona a store
     * @param {IUser} user usuário com name, email e password
     */
    [Actions.REGISTER_USER]: ({ commit }: Context, user: IUser) => Promise<void>;

    /**
     * @name LOGIN_USER
     * @description Efetua login do usuário, salva o token na store,
     * redireciona para a página de 'feedbacks' e aciona a action
     * para pegar os dados do usuário logado.
     * @param {IUser} user usuário com name, email e password
     */
    [Actions.LOGIN_USER]: (context: Context, user: IUser) => Promise<void>;

    /**
     * @name GET_USER
     * @descripton Captura os dados do usuário e efetua o login se já tiver um
     * token de usuário salvo, armazenando os dados na store
     */
    [Actions.GET_USER]: (context: Context) => Promise<void>;

    /**
     * @name LOGGOUT_USER
     * @descripton faz o usuário ser deslogado
     */
    [Actions.LOGGOUT_USER]: (context: Context) => Promise<void>;

    /**
     * @name GENERATE_NEW_KEY
     * @descripton gera uma nova chave de api para o usuário e a salva na store
     */
    [Actions.GENERATE_NEW_KEY]: (context: Context) => Promise<void>;

    [Actions.HANDLE_COPY_TEXT]: (context: Context, text: string) => Promise<void>;

    /**
     * @name GET_SUMMARY_FEEDBACK
     * @descripton pega a quantidade de cada tipo de feedback e salva na store
     * configurando para exibir os filtros da listagem
     */
    [Actions.GET_SUMMARY_FEEDBACK]: (context: Context) => Promise<void>;

    /**
     * @name CHANGE_ACTIVE_FEEDBACK
     * @descripton altera o tipo de feedback ativo
     * @param {TFeedback} type tipo do feedback retornado
     */
    [Actions.CHANGE_ACTIVE_FEEDBACK]: (context: Context, type: TFeedback) => Promise<void>;

    /**
     * @name GET_ALL_FEEDBACKS
     * @descripton
     * @param {Object} paramsRequest
     */
    [Actions.GET_ALL_FEEDBACKS]: (
        context: Context,
        feedbackTypeAndPagination: FeedbackTypeAndPagination
    ) => Promise<void>;
}
