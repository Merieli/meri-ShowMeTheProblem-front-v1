type TValidator = string | boolean;

export function validateEmptyAndEmail(value: string | any): TValidator {
    if (!value) {
        return '*Este campo é obrigatório';
    }

    const isValid = /^[a-z0-9.-_]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value);

    if (!isValid) {
        return '*Este campo precisa ser um e-mail';
    }

    return true;
}

export function validateEmptyAndLenght6(valueText: string | any): TValidator {
    if (!valueText) {
        return '*Este campo é obrigatório';
    }

    if (valueText.length < 6) {
        return '*Este campo precisa de no mínimo 6 caracteres';
    }

    return true;
}
