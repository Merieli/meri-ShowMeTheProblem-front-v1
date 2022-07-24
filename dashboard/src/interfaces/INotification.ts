export enum TypeOfNotification {
    SUCESSO,
    FALHA,
    ATENCAO,
}

export interface INotification {
    tipo: TypeOfNotification
    titulo: string
    texto: string
}
