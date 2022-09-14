<template>
    <div class="feedbacks-filter">
        <h5 class="font-bold mb-5 text-2xl">Filtros</h5>
        <ul class="feedbacks-filter__items">
            <li class="feedbacks-filter__item feedbacks-filter__item--selected">
                <span><i></i> Todos</span><span>300</span>
            </li>
            <li class="feedbacks-filter__item">
                <span><i></i>Problemas</span><span>150</span>
            </li>
            <li class="feedbacks-filter__item">
                <span><i></i>Ideias</span><span>50</span>
            </li>
            <li class="feedbacks-filter__item">
                <span><i></i>Outros</span><span>100</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Actions } from '../../store/type-actions'
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
    name: 'FeedbackFilters',
    methods: {
        ...mapActions({
            getFilters: Actions.GET_INDEX_FEEDBACK,
        }),
    },
    mounted() {
        this.getFilters()
    },
})
</script>

<style lang="scss" scoped>
.feedbacks-filter {
    &__item {
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
}
</style>
