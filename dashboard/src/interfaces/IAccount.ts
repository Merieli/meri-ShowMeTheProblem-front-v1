export interface IAccount {
    hasErrors: boolean
    isLoading: boolean
    name: {
        value?: string
        errorMessage?: string
    }
    email: {
        value?: string
        errorMessage?: string
    }
    password: {
        value?: string
        errorMessage?: string
    }
}
