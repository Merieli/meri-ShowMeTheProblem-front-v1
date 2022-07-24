import { TypeOfNotification } from '@/interfaces/INotification'
import { store } from '@/store'
import { Mutations } from '@/store/type-mutations'

type Notifier = {
    notify: (tipo: TypeOfNotification, titulo: string, texto: string) => void
}

export default (): Notifier => {
    const notify = (tipo: TypeOfNotification, titulo: string, texto: string): void => {
        store.commit(Mutations.NOTIFY, {
            tipo,
            titulo,
            texto,
        })
    }
    return {
        notify,
    }
}
