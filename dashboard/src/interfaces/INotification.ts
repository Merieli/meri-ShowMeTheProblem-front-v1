export enum TypeOfNotification {
    SUCESSO = 'sucesso',
    FALHA = 'falha',
    ATENCAO = 'atencao',
}

export interface INotification {
    tipo: {
        type: TypeOfNotification
        required: true
        default: TypeOfNotification.SUCESSO
    }
    titulo: {
        type: string
        required: true
    }
    texto: string
    id: number
}
