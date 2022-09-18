<template>
    <div class="feedbacks-filter">
        <h5 class="font-bold mb-5 text-2xl">Filtros</h5>
        <ul class="feedbacks-filter__items">
            <li
                class="feedbacks-filter__item"
                v-for="filter in filters"
                :key="filter.label"
                :class="{ 'feedbacks-filter__item--selected': filter.active }"
                @click="handleSelect(filter)"
            >
                <span>
                    <i :class="`bg-${filter.color}`" class="feedbacks-filter__circle"></i>
                    {{ filter.label }} </span
                ><span :class="filter.active ? `text-${filter.color}` : 'text-brand-graydark'" class="font-bold">{{
                    filter.amount
                }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { IStateFilters } from '../../interfaces'
import { useStore } from '../../store'
import { Actions } from '../../store/type-actions'
import { Mutations } from '../../store/type-mutations'
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
    name: 'FeedbackFilters',
    emits: ['select'],
    methods: {
        ...mapActions({
            getFilters: Actions.GET_INDEX_FEEDBACK,
        }),
        handleSelect({ type }: IStateFilters): void {
            console.log(type, this.filters)
            const newFiltersSelect = this.filters.forEach((filter: IStateFilters) => {
                if (filter.type === type) {
                    return (filter.active = true)
                }
                return (filter.active = false)
            })
            // this.store.commit(Mutations.ADD_FILTERS, newFiltersSelect)
        },
    },
    computed: {
        ...mapGetters({ filters: 'feedbackFilters' }),
    },
    mounted() {
        this.getFilters()
    },
    setup() {
        const store = useStore()
        return {
            store,
        }
    },
})
</script>

<style lang="scss" scoped>
.feedbacks-filter {
    &__item {
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
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

    &__circle {
        display: inline-block;
        border-radius: 100%;
        margin-right: 0.5rem;
        height: 0.5rem;
        width: 0.5rem;
    }
}

.bg {
    &-info {
        background-color: #8296fb;
    }

    &-graydark {
        background-color: #c0bcb0;
    }

    &-warning {
        background-color: #e4b52e;
    }

    &-danger {
        background-color: #f88676;
    }
}

.text {
    &-info {
        color: #8296fb;
    }

    &-graydark {
        color: #c0bcb0;
    }

    &-warning {
        color: #e4b52e;
    }

    &-danger {
        color: #f88676;
    }
}
</style>
