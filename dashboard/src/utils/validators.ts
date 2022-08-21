type TValidator = string | boolean

export function validateEmptyAndEmail(value: any): TValidator {
    if (!value) {
        return '*Este campo é obrigatório'
    }

    const isValid = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

    if (!isValid) {
        return '*Este campo precisa ser um e-mail'
    }

    return true
}

export function validateEmptyAndLenght6(value: any): TValidator {
    if (!value) {
        return '*Este campo é obrigatório'
    }

    if (value.length < 6) {
        return '*Este campo precisa de no mínimo 6 caracteres'
    }

    return true
}
