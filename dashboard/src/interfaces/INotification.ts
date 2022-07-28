export enum TypeOfNotification {
    SUCESSO,
    FALHA,
    ATENCAO,
}

export interface INotification {
    type: TypeOfNotification
    title: string
    text: string
    id: number
}
