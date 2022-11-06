import { TypeOfNotification } from '@/interfaces/INotification';
import { store } from '@/store';
import { Mutations } from '@/store/type-mutations';

type Notifier = {
    notify: (tipo: TypeOfNotification, titulo: string, texto: string) => void;
};

export default (): Notifier => {
    const notify = (type: TypeOfNotification, title: string, text: string): void => {
        store.commit(Mutations.NOTIFY, {
            type,
            title,
            text,
        });
    };
    return {
        notify,
    };
};
