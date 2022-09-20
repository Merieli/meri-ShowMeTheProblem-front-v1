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
                    <template #default>
                        <FeedbackFilters class="animate__animated animate__fadeIn animate__faster" />
                    </template>
                    <template #fallback>
                        <FiltersLoading class="mt-8" />
                    </template>
                </suspense>
            </aside>
            <div>Aconteceu um erro ao carregar os Feedbacks</div>
            <section class="feedbacks__cards mt-12">
                <div class="feedbacks__received">
                    <div v-for="feedback in feedbacks" :key="feedback.id" class="feedbacks__item">
                        <div class="feedback__top flex justify-between mb-6">
                            <div class="feedbacks__tag">{{ feedback.type }}</div>
                            <div class="text-sm text-gray-400">20 segundos atrás</div>
                        </div>
                        <p class="font-medium text-lg mb-4">
                            {{ feedback.text }}
                        </p>
                        <button class="font-medium text-gray-400">Show More</button>
                        <ul class="feedbacks__data flex justify-between flex-wrap">
                            <li class="w-3/6 mb-4">
                                <div class="font-medium text-xs text-gray-400">PÁGINA</div>
                                <p class="text-sm font-medium">{{ feedback.page }}</p>
                            </li>
                            <li class="w-3/6 mb-4">
                                <div class="font-medium text-xs text-gray-400">USUÁRIO</div>
                                <p class="text-sm font-medium">Joaquim</p>
                            </li>
                            <li class="mb-4">
                                <div class="font-medium text-xs text-gray-400">DISPOSITIVO</div>
                                <p class="text-sm font-medium">{{ feedback.device }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import FeedbackFilters from '../../components/Feedbacks/FeedbackFilters.vue'
import FiltersLoading from '../../components/Feedbacks/FiltersLoading.vue'
import GeralHeader from '../../components/GeralHeader.vue'
import { useStore } from '../../store'
import { Actions } from '../../store/type-actions'
import { computed, defineComponent, onMounted } from 'vue'

export default defineComponent({
    name: 'PageFeedbacks',
    components: { GeralHeader, FeedbackFilters, FiltersLoading },
    setup() {
        const store = useStore()

        onMounted(() => {
            const vazio = { type: '', limit: '', offset: '' }
            store.dispatch(Actions.GET_ALL_FEEDBACKS, vazio)
        })

        return {
            feedbacks: computed(() => store.getters.feedbacks),
            isLoading: computed(() => store.getters.isLoading),
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
