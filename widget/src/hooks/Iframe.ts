import { useStore } from '@/store';
import { Mutations } from '@/store/Mutations';

interface IframeControl {
    updateCoreValuesOnStore(): void;
    notifyOpen(): void;
    notifyClose(): void;
}

export default function useIframeControl(): IframeControl {
    const store = useStore();

    const updateCoreValuesOnStore = () => {
        if (process.env.NODE_ENV === 'production') {
            const query = new URLSearchParams(window.location.search);
            const apiKey = query.get('api_key') ?? '';
            const page = query.get('page') ?? '';
            const fingerprint = query.get('fingerprint') ?? '';

            store.commit(Mutations.SET_CURRENT_PAGE, page);
            store.commit(Mutations.SET_APIKEY, apiKey);
            store.commit(Mutations.SET_FINGERPRINT, fingerprint);
            return;
        }

        store.commit(Mutations.SET_CURRENT_PAGE, 'https://playground-url.com');
        store.commit(Mutations.SET_APIKEY, 'fcd5015c-10d3-4e9c-b395-ec7ed8850165');
        store.commit(Mutations.SET_FINGERPRINT, '122131323421');
    };

    const notifyOpen = () => {
        window.parent.postMessage(
            {
                isWidget: true,
                isOpen: true,
            },
            '*'
        );
    };

    const notifyClose = () => {
        window.parent.postMessage(
            {
                isWidget: true,
                isOpen: false,
            },
            '*'
        );
    };

    return {
        updateCoreValuesOnStore,
        notifyOpen,
        notifyClose,
    };
}
