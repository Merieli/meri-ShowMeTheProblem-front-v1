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
                <h5 class="font-bold mb-5 text-2xl">Filtros</h5>
                <ul class="feedbacks__filters">
                    <li class="feedbacks__filter feedbacks__filter--selected">
                        <span><i></i> Todos</span><span>300</span>
                    </li>
                    <li class="feedbacks__filter">
                        <span><i></i>Problemas</span><span>150</span>
                    </li>
                    <li class="feedbacks__filter">
                        <span><i></i>Ideias</span><span>50</span>
                    </li>
                    <li class="feedbacks__filter">
                        <span><i></i>Outros</span><span>100</span>
                    </li>
                </ul>
            </aside>
            <section class="feedbacks__cards mt-12">
                <ul class="feedbacks__received">
                    <li class="feedbacks__item">
                        <div class="feedback__top flex justify-between mb-6">
                            <div class="feedbacks__tag">Problema</div>
                            <div class="text-sm text-gray-400">20 segundos atrás</div>
                        </div>
                        <p class="font-medium text-lg mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repre henderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <button>Show More</button>
                        <ul class="feedbacks__data flex justify-between flex-wrap">
                            <li class="w-3/6 mb-6">
                                <div>PÁGINA</div>
                                <p>https://feedbacker.com/ajuda</p>
                            </li>
                            <li class="w-3/6 mb-6">
                                <div>USUÁRIO</div>
                                <p>Joaquim</p>
                            </li>
                            <li class="mb-6">
                                <div>DISPOSITIVO</div>
                                <p>Chrome 90.0, macOS 10.14</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import GeralHeader from '../../components/GeralHeader.vue'
import { Actions } from '../../store/type-actions'
import { defineComponent } from '@vue/runtime-core'
import { mapActions } from 'vuex'

export default defineComponent({
    components: { GeralHeader },
    name: 'PageFeedbacks',
    methods: {
        ...mapActions({
            getFeedback: Actions.GET_ALL_FEEDBACKS,
        }),
    },
    mounted() {
        this.getFeedback('idea', 5, 0)
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

    &__listing {
        width: 300px;
        height: 100%;
    }

    &__filter {
        border-radius: 0.25rem;
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        margin-bottom: 0.1rem;
        cursor: pointer;

        &--selected {
            background-color: #c4c4c452;
        }

        &:hover {
            background-color: #c4c4c41f;
        }
    }

    &__item {
        background-color: theme('colors.brand.gray');
        border-radius: 0.25rem;
        padding: 1.1rem 1.5rem;
    }
}
</style>
