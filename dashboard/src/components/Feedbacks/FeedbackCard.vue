<template>
    <div class="feedback-card cursor-pointer" data-feedback="card" @click="handleToggle">
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
import { IFeedback } from '../../interfaces';
import { getDiffTimeBetweenCurrentDate } from '../../utils/generateDate';
import { wait } from '../../utils/timeout';
import UseIcon from '../UseIcon/UseIcon.vue';
import { computed, defineComponent, PropType, reactive } from 'vue';

/**
 * Componente de cartão do feedback exibido na página de Feedbacks.
 * @author Meriéli Manzano
 */
export default defineComponent({
    name: 'FeedbackCard',
    components: { UseIcon },
    props: {
        /**
         * Define o feedback a ser exibido no Card.
         */
        feedback: {
            type: {} as PropType<IFeedback>,
            required: true,
        },
        /**
         * Define se o Card está aberto.
         */
        isOpened: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const state = reactive({
            isOpen: props.isOpened,
            isClosing: !props.isOpened,
        });

        const label = computed(() => {
            if (props.feedback.type === 'ISSUE') return 'problema';

            if (props.feedback.type === 'IDEA') return 'ideia';

            return 'outro';
        });

        const classColor = computed(() => {
            if (props.feedback.type === 'ISSUE') return 'danger';

            if (props.feedback.type === 'IDEA') return 'warning';

            return 'graydark';
        });

        /**
         * Ativado quando o card é clicado
         */
        const handleToggle = async () => {
            state.isClosing = true;
            await wait(250);
            state.isOpen = !state.isOpen;

            state.isClosing = false;
        };

        return {
            state,
            label,
            classColor,
            getDiffTimeBetweenCurrentDate,
            handleToggle,
        };
    },
});
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

<docs lang="md">
#### 📲 **_Exemplos de uso_**

Cartão de Feedback **aberto**:

```jsx
const feedbackExample = {
    "text": "Podia ter um botão de solicitar demo 1",
    "fingerprint": "490135491",
    "id": "eab759f8-f238-4ff9-ae91-ee1558982329",
    "apiKey": "fcd5015c-10d3-4e9c-b395-ec7ed8850165",
    "type": "IDEA",
    "device": "Chrome 85.0, macOS 10.14",
    "page": "https://feedbacker.com/pricing",
    "createdAt": 1608681600000
}

<FeedbackCard is-opened="true" feedback="text/Teste,fingerprint/490135491,id/eab759f8-f238,apiKey/fcd5015c-10d3,type/IDEA,device/Chrome,page/example.com,createdAt/1608681600000" >Push Me</FeedbackCard>
```
</docs>
