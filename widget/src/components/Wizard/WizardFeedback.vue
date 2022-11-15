<template>
    <component :is="currentComponent" @select-feedback-type="setSelectFeedbackType" @next="next" />
</template>
<script lang="ts">
import useNavigation, { Navigation } from '@/composables/Navigation';
import { useStore } from '@/store';
import { Mutations } from '@/store/Mutations';
import { computed, ComputedRef, defineComponent } from 'vue';
import SelectFeedbackType from './SelectFeedbackType.vue';
import WriteAFeedback from './WriteAFeedback.vue';
import SucessSave from './SucessSave.vue';
import ErrorSave from './ErrorSave.vue';

interface SetupReturn {
    next: Navigation['next'];
    currentComponent: ComputedRef<string>;
    setSelectFeedbackType(type: string): void;
}

export default defineComponent({
    components: {
        SelectFeedbackType,
        WriteAFeedback,
        SucessSave,
        ErrorSave,
    },
    setup(): SetupReturn {
        const store = useStore();
        const { next } = useNavigation();

        const setSelectFeedbackType = (type: string): void => {
            store.commit(Mutations.SET_FEEDBACK_TYPE, type);
            store.commit(Mutations.SET_CURRENT_COMPONENT, 'WriteAFeedback');
        };

        const currentComponent = computed(() => store.getters.currentComponent);

        return {
            next,
            currentComponent,
            setSelectFeedbackType,
        };
    },
});
</script>
