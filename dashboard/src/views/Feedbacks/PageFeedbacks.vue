<template>
    <div class="feedbacks">
        <GeralHeader />
        <section class="feedbacks__info text-brand-black">
            <h2 class="text-5xl font-black mb-2">Feedbacks</h2>
            <p class="font-normal text-base">Detalhes de todos os feedbacks recebidos.</p>
        </section>
        <div class="feedbacks__all mt-8 mx-8">
            <aside class="feedbacks__listing mr-16 min-w-[20%]">
                <h4 class="text-4xl font-black mb-9">Listagem</h4>
                <suspense>
                    <FeedbackFilters
                        @select="fetchFeedbacks"
                        class="animate__animated animate__fadeIn animate__faster"
                    />
                    <template #fallback>
                        <FiltersLoading class="mt-8" />
                    </template>
                </suspense>
            </aside>
            <section class="feedbacks__cards mt-12">
                <div v-if="hasErrors" class="text-lg text-center text-gray-800 font-regular">
                    Aconteceu um erro ao carregar os Feedbacks 😥
                </div>
                <div
                    v-if="!isLoading && !state.isLoadingFeedbacks && !feedbacks.length && !hasErrors"
                    class="text-lg text-center text-gray-800 font-regular"
                >
                    Ainda nenhum feedback recebido 🤓
                </div>
                <FeedbackCardLoading
                    v-if="(isLoading || state.isLoadingFeedbacks) && !hasErrors && !state.isLoadingMoreFeedbacks"
                />
                <FeedbackCard
                    v-else-if="!hasErrors"
                    v-for="(feedback, index) in feedbacks"
                    :key="feedback.id"
                    :is-opened="index === 0"
                    :feedback="feedback"
                />
                <FeedbackCardLoading
                    v-if="state.isLoadingMoreFeedbacks && feedbacks.length < paginationTotal"
                    :less="true"
                />
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import FeedbackCard from '../../components/Feedbacks/FeedbackCard.vue'
import FeedbackCardLoading from '../../components/Feedbacks/FeedbackCardLoading.vue'
import FeedbackFilters from '../../components/Feedbacks/FeedbackFilters.vue'
import FiltersLoading from '../../components/Feedbacks/FiltersLoading.vue'
import GeralHeader from '../../components/GeralHeader.vue'
import { TFeedback } from '../../interfaces'
import { useStore } from '../../store'
import { Actions } from '../../store/type-actions'
import { computed, defineComponent, onErrorCaptured, onMounted, onUnmounted, reactive, ref } from 'vue'

export default defineComponent({
    name: 'PageFeedbacks',
    components: {
        GeralHeader,
        FeedbackFilters,
        FiltersLoading,
        FeedbackCard,
        FeedbackCardLoading,
    },
    setup() {
        const store = useStore()
        const hasErrors = computed(() => store.getters.hasErrors)
        const feedbacks = computed(() => store.getters.feedbacks)
        const currentFeedbackType = computed(() => store.getters.feedbackCurrentType)

        const paginationLimit = computed(() => store.getters.paginationFeedbacksLimit)
        const paginationOffset = computed(() => store.getters.paginationFeedbacksOffset)
        const paginationTotal = computed(() => store.getters.paginationFeedbacksTotal)

        const state = reactive({
            isLoadingFeedbacks: false,
            isLoadingMoreFeedbacks: false,
        })

        const hasErrorComponent = ref(false)

        function handleErrors(error: unknown) {
            state.isLoadingFeedbacks = false
            state.isLoadingMoreFeedbacks = false
            hasErrorComponent.value = !!error
        }

        const setTheCorrectParameters = (type?: TFeedback | string, offset?: number) => {
            const isNewTypeFeedback = type != currentFeedbackType.value
            let typeCorrect: Omit<TFeedback, 'all'> | ''
            let offsetCorrect: number

            typeCorrect = type ? type : currentFeedbackType.value
            offsetCorrect = offset ? offset : paginationOffset.value

            if (typeCorrect === 'all') {
                typeCorrect = ''
            }

            if (isNewTypeFeedback) {
                offsetCorrect = 0
                state.isLoadingMoreFeedbacks = false
            }

            return {
                typeCorrect,
                offsetCorrect,
            }
        }

        async function fetchFeedbacks(type?: TFeedback | string, offset?: number) {
            try {
                state.isLoadingFeedbacks = true
                const { typeCorrect, offsetCorrect } = setTheCorrectParameters(type, offset)
                return await store.dispatch(Actions.GET_ALL_FEEDBACKS, {
                    type: typeCorrect,
                    limit: paginationLimit.value,
                    offset: offsetCorrect,
                })
            } catch (e) {
                handleErrors(e)
            } finally {
                state.isLoadingFeedbacks = false
            }
        }

        async function handleScroll() {
            const isBottomOfWindow =
                Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
                document.documentElement.scrollHeight

            if (state.isLoadingFeedbacks || state.isLoadingMoreFeedbacks) return
            if (feedbacks.value.length >= paginationTotal.value) {
                state.isLoadingMoreFeedbacks = false
                return
            }
            if (!isBottomOfWindow) return

            const newPage = paginationOffset.value + paginationLimit.value
            try {
                state.isLoadingMoreFeedbacks = true
                fetchFeedbacks(currentFeedbackType.value, newPage)
            } catch (e) {
                handleErrors(e)
            }
        }

        onMounted(() => {
            if (feedbacks.value.length == 0) {
                fetchFeedbacks('all', 0)
            }
            window.addEventListener('scroll', handleScroll, false)
        })
        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll, false)
        })

        onErrorCaptured(handleErrors)

        return {
            feedbacks,
            state,
            isLoading: computed(() => store.getters.isLoading),
            hasErrors,
            fetchFeedbacks,
            paginationTotal,
        }
    },
})
</script>

<style lang="scss" scoped>
.feedbacks {
    &__info {
        background-color: theme('colors.brand.gray');
        text-align: center;
        padding: 6.43rem;
    }
    &__all {
        display: flex;
    }

    &__cards {
        width: 100%;
    }

    &__listing {
        width: 300px;
        height: 100%;
    }

    &__item {
        background-color: theme('colors.brand.gray');
        border-radius: 0.25rem;
        padding: 1.1rem 1.5rem;
        margin-bottom: 1.5rem;
        width: 100%;
    }
}
</style>
