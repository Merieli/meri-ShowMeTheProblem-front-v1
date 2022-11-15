<template>
    <div class="w-full flex flex-col items-center justify-center w-ful my-5">
        <textarea
            v-model="state.feedback"
            name=""
            id=""
            cols="30"
            rows="10"
            class="w-full rounded-lg border-2 border-gray-300 border-solid h-24 p-2 resize-none focus:outline-none"
        ></textarea>
        <button
            type="submit"
            @click="submitFeedback"
            :disabled="submitButtonIsDisabled"
            :class="{
                'opacity-50': state.isLoading,
                'opacity-50 bg-gray-100 text-gray-500': submitButtonIsDisabled,
                'bg-brand-main text-white': !submitButtonIsDisabled,
            }"
            class="rounded-lg font-black mt-3 flex flex-col justify-center items-center py-2 w-full cursor-pointer focus:outline-none transition-all duration-200"
        >
            <UseIcon v-if="state.isLoading" name="IconLoading" color="white" class="animate-spin" />
            <template v-else>Enviar feedback</template>
        </button>
    </div>
</template>
<script lang="ts">
import { useStore } from '@/store';
import { Actions } from '@/store/Actions';
import { computed, ComputedRef, defineComponent, reactive } from 'vue';
import UseIcon from '../UseIcon/UseIcon.vue';

type State = {
    feedback: string;
    isLoading: boolean;
    hasError: boolean | null;
};

interface SetupReturn {
    state: State;
    submitButtonIsDisabled: ComputedRef<boolean>;
    submitFeedback(): Promise<void>;
}

export default defineComponent({
    components: { UseIcon },
    setup(): SetupReturn {
        const store = useStore();
        const state = reactive<State>({
            feedback: '',
            isLoading: false,
            hasError: null,
        });
        const submitButtonIsDisabled = computed<boolean>(() => {
            return !state.feedback.length;
        });
        const handleError = () => {
            state.hasError = true;
            state.isLoading = false;
        };

        const submitFeedback = async (): Promise<void> => {
            try {
                state.isLoading = true;
                await store.dispatch(Actions.SAVE_FEEDBACK, state.feedback);
            } catch (error) {
                handleError();
            } finally {
                state.isLoading = false;
            }
        };

        return {
            state,
            submitButtonIsDisabled,
            submitFeedback,
        };
    },
});
</script>
