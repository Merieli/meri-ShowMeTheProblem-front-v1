export enum TypeOfNotification {
    SUCESSO,
    FALHA,
    ATENCAO,
}

export interface INotification {
    tipo: {
        type: TypeOfNotification
        required: true
    }
    titulo: {
        type: string
        required: true
    }
    texto: string
    id: number
}
