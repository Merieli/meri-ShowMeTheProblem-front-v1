import { StateStoreShape } from '@/interfaces'
import { key } from '@/store'
import { Actions } from '@/store/type-actions'
import PageFeedbacks from '@/views/Feedbacks/PageFeedbacks.vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createStore, Store } from 'vuex'

describe('PageFeedback.vue', () => {
    let wrapper: VueWrapper

    const getters = {
        hasErrors: () => mockStore.state.hasErrors,
        feedbacks: () => mockStore.state.feedbacks,
        feedbackFilters: () => mockStore.state.feedbacks.filters,
        feedbackCurrentType: () => mockStore.state.feedbacks.currentType,
        paginationFeedbacksLimit: () => mockStore.state.feedbacks.pagination.limit,
        paginationFeedbacksOffset: () => mockStore.state.feedbacks.pagination.total,
        paginationFeedbacksTotal: () => mockStore.state.feedbacks.pagination.offset,
    }

    const actions = {
        [Actions.GET_ALL_FEEDBACKS]: jest.fn(),
        [Actions.GET_SUMMARY_FEEDBACK]: jest.fn(),
        [Actions.CHANGE_ACTIVE_FEEDBACK]: jest.fn(),
    }

    type TStoreState = Pick<StateStoreShape, 'feedbacks' | 'filters' | 'hasErrors' | 'isLoading'>

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
            hasErrors: false,
        },
        getters,
        actions,
    })

    beforeEach(() => {
        wrapper = mount(PageFeedbacks, {
            global: {
                plugins: [[mockStore, key]],
                stubs: ['GeralHeader'],
            },
        })
    })

    afterEach(() => {
        wrapper.unmount()
        jest.clearAllMocks()
    })

    describe('Integração/Componente', () => {
        describe('👀 Renderização:', () => {
            test('Dado o componente Quando renderizado Então deve possuir html equivalente ao Snapshot gravado', () => {
                expect(wrapper.html()).toMatchSnapshot()
            })

            test('Dado o carregamento da página Quando os filtros forem exibidos Então deve haver os filtros "Todos, Problemas, Ideias e Outros"', () => {
                const filterLabels = wrapper.findAll('[data-filter="label"]')

                expect(filterLabels[0].text()).toBe('Todos')
                expect(filterLabels[1].text()).toBe('Problemas')
                expect(filterLabels[2].text()).toBe('Ideias')
                expect(filterLabels[3].text()).toBe('Outros')
            })

            test('Dado o carregamento da página Quando os filtros forem exibidos Então devem possuir a quantidade correta de feedbacks para cada categoria', () => {
                const filterAmount = wrapper.findAll('[data-filter="amount"]')

                expect(filterAmount[0].text()).toBe('3')
                expect(filterAmount[1].text()).toBe('2')
                expect(filterAmount[2].text()).toBe('1')
                expect(filterAmount[3].text()).toBe('0')
            })

            test('Dado os filtros Quando forem exibidos Então o filtro "Todos" deve estar selecionado', () => {
                const filterTodos = wrapper.find('[data-filter="Todos"]')
                expect(filterTodos.attributes('class')).toContain('feedbacks-filter__item--selected')
            })
        })
        describe('🧠 Comportamento:', () => {
            // No componente eu testo:
            // Confirmar se o state é renderizado
            //a mutação é confirmada?
            // ele tem a carga correta?
            // NÃO testar se o getter funciona, mas se o código do componente exibe o conteudo corretamente que é chamado de um getter
            // Testar se a action é disparada quando o evento ocorre, e se ela tem a carga correta

            test('Dado a página de feedbacks Quando carregar Então deve chamar a Action uma vez para exibir todos os feedbacks', () => {
                const getFeedbacks = actions[Actions.GET_ALL_FEEDBACKS]

                expect(getFeedbacks).toHaveBeenCalled()
                expect(getFeedbacks).toHaveBeenCalledTimes(1)
            })

            test('Dado um usuário Quando carregar a página Então deve chamar a Action uma vez para exibir todos os filtros', () => {
                const getFilters = actions[Actions.GET_SUMMARY_FEEDBACK]

                expect(getFilters).toHaveBeenCalled()
                expect(getFilters).toHaveBeenCalledTimes(1)
            })

            test('Dado os filtros de feedbacks Quando clicar para exibir "Problemas" Então deve mudar os feedbacks exibidos para apenas os dessa categoria chamando a Action uma vez', async () => {
                const activeFeedback = actions[Actions.CHANGE_ACTIVE_FEEDBACK]
                const filterIssue = wrapper.find('[data-filter="Problemas"]')
                await filterIssue.trigger('click')

                expect(activeFeedback).toHaveBeenCalled()
                expect(activeFeedback).toHaveBeenCalledTimes(1)
            })

            test('Dado o carregamento dos feedbacks Quando ocorrer algum erro Então deve exibir a mensagem de erro', async () => {
                mockStore.state.hasErrors = true
                await nextTick()
                const errorMessage = wrapper.find('[data-feedbacks="error"]')

                expect(errorMessage.text()).toContain('Aconteceu um erro ao carregar os Feedbacks')
            })
        })
    })
})
