<template>
    <div
        class="box animate__animated animate__fadeInUp animate__faster fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl py-5 px-5 flex items-center flex-col shadow-xl select-none"
    >
        <header
            class="relative w-full flex"
            :class="{
                'justify-between': canShowAdditionalControlAndInfo,
                'justify-end': !canShowAdditionalControlAndInfo,
            }"
        >
            <button
                v-if="canShowAdditionalControlAndInfo"
                @click="back"
                type="button"
                :disabled="canGoBack"
                :class="{ invisible: canGoBack }"
                class="text-xl text-gray-800 focus:outline-none"
            >
                <UseIcon name="IconBack" :color="colors.gray['800']" />
            </button>

            <p v-if="canShowAdditionalControlAndInfo" class="text-xl font-black text-center text-brand-main">
                {{ label }}
            </p>

            <button @click="() => emit('close-box')" class="text-xl text-gray-800 focus:outline-none">
                <UseIcon name="IconClose" size="14" :color="colors.gray['800']" />
            </button>
        </header>
        <WizardFeedback />
        <div class="text-gray-800 text-sm flex" v-if="canShowAdditionalControlAndInfo">
            <UseIcon class="mr-1" name="IconChat" size="14" :color="colors.gray['500']" />
            widget by
            <span class="ml-1 font-bold">showMeTheProblem</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ComputedRef, SetupContext } from 'vue';
import colors from 'tailwindcss/colors';
import { useStore } from '@/store';
import UseIcon from '@/components/UseIcon/UseIcon.vue';
import WizardFeedback from '@/components/Wizard/WizardFeedback.vue';
import useNavigation, { Navigation } from '@/composables/Navigation';

interface SetupReturn {
    emit: SetupContext['emit'];
    back: Navigation['back'];
    label: ComputedRef<string>;
    colors: any;
    canGoBack: ComputedRef<boolean>;
    canShowAdditionalControlAndInfo: ComputedRef<boolean>;
}

export default defineComponent({
    components: {
        UseIcon,
        WizardFeedback,
    },
    emits: ['close-box'],
    setup(_, { emit }: SetupContext): SetupReturn {
        const store = useStore();
        const { back } = useNavigation();
        const type = computed(() => {
            return store.getters.feedbackType;
        });
        const component = computed(() => {
            return store.getters.currentComponent;
        });

        const label = computed<string>(() => {
            if (type.value === 'ISSUE') {
                return 'Reporte um problema';
            }

            if (type.value === 'IDEA') {
                return 'Conte a sua ideia';
            }

            if (type.value === 'OTHER') {
                return 'Abra a sua mente';
            }

            return 'O que você tem em mente?';
        });

        const canGoBack = computed<boolean>(() => {
            return component.value === 'SelectFeedbackType';
        });
        const canShowAdditionalControlAndInfo = computed<boolean>(() => {
            return component.value !== 'SuccessSave' && component.value !== 'ErrorSave';
        });

        return {
            emit,
            back,
            label,
            colors,
            canGoBack,
            canShowAdditionalControlAndInfo,
        };
    },
});
</script>
<style lang="scss" scoped>
.box {
    max-width: 400px;

    @media screen and (min-width: 400px) {
        min-width: 400px;
    }

    @media screen and (max-width: 400px) {
        min-width: none;
    }
}
</style>
