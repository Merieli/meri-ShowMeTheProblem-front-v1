<template>
    <div class="feedback-card cursor-pointer" @click="handleToggle">
        <header class="feedback__top flex justify-between mb-6">
            <div
                class="feedbacks__badge p-2 text-xs font-black text-white uppercase rounded-full"
                :class="`bg-${classColor}`"
            >
                {{ label }}
            </div>
            <div class="font-regular text-sm text-brand-graydark">
                {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
            </div>
        </header>
        <p class="font-medium text-lg mb-4 text-gray-800">
            {{ feedback.text }}
        </p>
        <div v-if="!state.isOpen" class="font-medium text-gray-400 flex justify-end w-full">
            <UseIcon name="IconChevron" color="#A9A9A9" size="18" />
        </div>
        <ul
            v-if="state.isOpen"
            :class="{
                animate__fadeOutUp: state.isClosing,
            }"
            class="feedbacks__data flex justify-between flex-wrap animate__animated animate__fadeInUp animate__faster"
        >
            <li class="w-1/2 mb-4">
                <div class="font-medium text-xs text-gray-400">PÁGINA</div>
                <p class="text-sm font-medium">{{ feedback.page }}</p>
            </li>
            <li class="w-1/2 mb-4">
                <div class="font-medium text-xs text-gray-400">USUÁRIO</div>
                <p class="text-sm font-medium">{{ feedback.fingerprint }}</p>
            </li>
            <li class="mb-4">
                <div class="font-medium text-xs text-gray-400">DISPOSITIVO</div>
                <p class="text-sm font-medium">{{ feedback.device }}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { getDiffTimeBetweenCurrentDate } from '../../utils/generateDate'
import { wait } from '../../utils/timeout'
import UseIcon from '../UseIcon/UseIcon.vue'
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
    name: 'FeedbackCard',
    components: { UseIcon },
    props: {
        feedback: {
            type: Object,
            required: true,
        },
        isOpened: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const state = reactive({
            isOpen: props.isOpened,
            isClosing: !props.isOpened,
        })

        const label = computed(() => {
            if (props.feedback.type === 'ISSUE') return 'problema'

            if (props.feedback.type === 'IDEA') return 'ideia'

            return 'outro'
        })

        const classColor = computed(() => {
            if (props.feedback.type === 'ISSUE') return 'danger'

            if (props.feedback.type === 'IDEA') return 'warning'

            return 'graydark'
        })

        const handleToggle = async () => {
            state.isClosing = true
            await wait(250)
            state.isOpen = !state.isOpen

            state.isClosing = false
        }

        return {
            state,
            label,
            classColor,
            getDiffTimeBetweenCurrentDate,
            handleToggle,
        }
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
</style>
