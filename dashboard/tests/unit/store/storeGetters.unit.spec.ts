import { state } from './__mocks__/stateStore';
import { getters } from '@/store';

describe('Getters da Store Vuex', () => {
    describe('🧪 Unidade:', () => {
        test('Dado um getter de "hasErrors" Quando for chamado Então deve possuir o valor de hasErrors da state', () => {
            const getterHasErrors = getters.hasErrors(state);

            expect(getterHasErrors).toEqual(state.hasErrors);
        });

        test('Dado um getter de "feedbacks" Quando for chamado Então deve possuir o valor de feedbacks da state', () => {
            const getterFeedbacks = getters.feedbacks(state);

            expect(getterFeedbacks).toEqual(state.feedbacks.data);
        });

        test('Dado um getter de "feedbackCurrentType" Quando for chamado Então deve possuir o valor de feedbackCurrentType da state', () => {
            const getterFeedbackCurrentTypes = getters.feedbackCurrentType(state);

            expect(getterFeedbackCurrentTypes).toEqual(state.feedbacks.currentType);
        });

        test('Dado um getter de "paginationFeedbacksLimit" Quando for chamado Então deve possuir o valor de paginationFeedbacksLimit da state', () => {
            const getterPaginationLimit = getters.paginationFeedbacksLimit(state);

            expect(getterPaginationLimit).toEqual(state.feedbacks.pagination.limit);
        });
    });
});
