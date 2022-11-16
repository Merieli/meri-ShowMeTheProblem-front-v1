import { useStore } from '@/store';
import { Mutations } from '@/store/Mutations';
import { computed } from 'vue';

export interface Navigation {
    next(): void;
    back(): void;
}

export default function useNavigation(): Navigation {
    const store = useStore();

    const currentComponent = computed(() => store.getters.currentComponent);

    const next = (): void => {
        if (currentComponent.value === 'SelectFeedbackType') {
            store.commit(Mutations.SET_CURRENT_COMPONENT, 'WriteAFeedback');
        }
    };
    const back = (): void => {
        if (currentComponent.value === 'WriteAFeedback') {
            store.commit(Mutations.SET_CURRENT_COMPONENT, 'SelectFeedbackType');
            store.commit(Mutations.SET_FEEDBACK_TYPE, '');
        }
    };

    return {
        next,
        back,
    };
}
