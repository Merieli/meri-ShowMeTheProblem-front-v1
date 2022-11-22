import { StateStoreShape, TypeOfNotification } from '@/interfaces';

export const state: StateStoreShape = {
    users: [
        {
            name: 'Igor',
            email: 'igor.me@gmail.com',
            password: 'abcd123',
        },
    ],
    notifications: [
        {
            type: TypeOfNotification.FALHA,
            title: 'Uma alerta',
            text: 'Notificando o usuario do ocorrido',
            id: 1,
        },
    ],
    isLogged: true,
    userLogged: {
        name: 'Igor Blanquio',
        token: '1234asbaks123sdzg',
        apiKey: 'abcdefghijklmno',
    },
    feedbacks: {
        data: [],
        filters: [
            {
                label: 'Todos',
                color: {
                    text: 'text-info',
                    bg: 'bg-info',
                },
                amount: 3,
                active: true,
                type: 'all',
            },
            {
                label: 'Problemas',
                color: {
                    text: 'text-danger',
                    bg: 'bg-danger',
                },
                amount: 2,
                active: false,
                type: 'issue',
            },
            {
                label: 'Ideias',
                color: {
                    text: 'text-warning',
                    bg: 'bg-warning',
                },
                amount: 1,
                active: false,
                type: 'idea',
            },
            {
                label: 'Outros',
                color: {
                    text: 'text-graydark',
                    bg: 'bg-graydark',
                },
                amount: 0,
                active: false,
                type: 'other',
            },
        ],
        pagination: {
            limit: 4,
            offset: 0,
            total: 0,
        },
        currentType: 'all',
    },
    filters: {
        all: 3,
        idea: 1,
        issue: 2,
        other: 0,
    },
    isLoading: false,
    hasErrors: false,
};
