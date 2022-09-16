<template>
    <div class="feedback-card">
        <header class="feedback-card__header flex justify-between mb-6">
            <div class="feedback-card__tag">{{ feedback.type }}</div>
            <div class="text-sm text-gray-400">20 segundos atrás</div>
        </header>
        <p class="font-medium text-lg mb-4">
            {{ feedback.text }}
        </p>
        <button>Show More</button>
        <ul class="feedback-card__data flex justify-between flex-wrap">
            <li class="w-3/6 mb-6">
                <div>PÁGINA</div>
                <p>{{ feedback.page }}</p>
            </li>
            <li class="w-3/6 mb-6">
                <div>USUÁRIO</div>
                <p>Joaquim</p>
            </li>
            <li class="mb-6">
                <div>DISPOSITIVO</div>
                <p>{{ feedback.device }}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FeedbackCard',
    setup() {
        return {}
    },
})
</script>

<style lang="scss" scoped>
.feedback-card {
    background-color: theme('colors.brand.gray');
    border-radius: 0.25rem;
    padding: 1.1rem 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;

    &__info {
        background-color: theme('colors.brand.gray');
        text-align: center;
        padding: 6.43rem;
    }

    &__cards {
        width: 100%;
    }
}
</style>
