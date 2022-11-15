import { useStore } from '@/store';
import { Mutations } from '@/store/Mutations';

export interface Navigation {
    setError(): void;
    setSuccess(): void;
    next(): void;
    back(): void;
}

export default function useNavigation(): Navigation {
    const store = useStore();

    const setError = (): void => {
        store.commit(Mutations.SET_CURRENT_COMPONENT, 'Error');
    };

    const setSuccess = (): void => {
        store.commit(Mutations.SET_CURRENT_COMPONENT, 'Success');
    };

    const next = (): void => {
        if (store.getters.currentComponent === 'SelectFeedbackType') {
            store.commit(Mutations.SET_CURRENT_COMPONENT, 'WriteAFeedback');
        }
    };
    const back = (): void => {
        if (store.getters.currentComponent === 'WriteAFeedback') {
            store.commit(Mutations.SET_CURRENT_COMPONENT, 'SelectFeedbackType');
            store.commit(Mutations.SET_FEEDBACK_TYPE, '');
        }
    };

    return {
        setError,
        setSuccess,
        next,
        back,
    };
}
