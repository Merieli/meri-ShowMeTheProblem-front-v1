import FeedbackFiltres from '@/components/Feedbacks/FeedbackFilters.vue';
import { StateStoreShape } from '@/interfaces';
import { key } from '@/store';
import { Actions } from '@/store/type-actions';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createStore, Store } from 'vuex';

describe('FeedbackFilters.vue', () => {
    const getters = {
        isLoading: () => mockStore.state.isLoading,
        feedbackFilters: () => mockStore.state.feedbacks.filters,
    };

    const actions = {
        [Actions.GET_SUMMARY_FEEDBACK]: jest.fn(),
        [Actions.CHANGE_ACTIVE_FEEDBACK]: jest.fn(),
    };

    type TStoreState = Pick<StateStoreShape, 'feedbacks' | 'filters' | 'isLoading'>;

    const mockStore: Store<TStoreState> = createStore<TStoreState>({
        state: {
            feedbacks: {
                data: [], //o resultado depende da Action portanto não deve ser mockado
                filters: [
                    {
                        label: 'Todos',
                        color: {
                            text: 'text-info',
                            bg: 'bg-info',
                        },
                        amount: 3,
                        active: true,
                        type: 'all',
                    },
                    {
                        label: 'Problemas',
                        color: {
                            text: 'text-danger',
                            bg: 'bg-danger',
                        },
                        amount: 2,
                        active: false,
                        type: 'issue',
                    },
                    {
                        label: 'Ideias',
                        color: {
                            text: 'text-warning',
                            bg: 'bg-warning',
                        },
                        amount: 1,
                        active: false,
                        type: 'idea',
                    },
                    {
                        label: 'Outros',
                        color: {
                            text: 'text-graydark',
                            bg: 'bg-graydark',
                        },
                        amount: 0,
                        active: false,
                        type: 'other',
                    },
                ],
                pagination: {
                    limit: 4,
                    offset: 0,
                    total: 0,
                },
                currentType: 'all',
            },
            filters: {
                all: 3,
                idea: 1,
                issue: 2,
                other: 0,
            },
            isLoading: false,
        },
        getters,
        actions,
    });

    const wrapper: VueWrapper = shallowMount(FeedbackFiltres, {
        global: {
            plugins: [[mockStore, key]],
        },
    });

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', () => {
                expect(wrapper.html()).toMatchSnapshot();
            });

            test('Dado os filtros Quando forem renderizados Então deve exibir os filtros "Todos, Problemas, Ideias e Outros"', () => {
                const filterLabels = wrapper.findAll('[data-filter="label"]');

                expect(filterLabels[0].text()).toBe('Todos');
                expect(filterLabels[1].text()).toBe('Problemas');
                expect(filterLabels[2].text()).toBe('Ideias');
                expect(filterLabels[3].text()).toBe('Outros');
            });
        });
        // describe('🧠 Comportamento:', () => {})
    });
});
