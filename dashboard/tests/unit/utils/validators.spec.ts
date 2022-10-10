import { validateEmptyAndEmail, validateEmptyAndLenght6 } from '@/utils/validators'

describe('Validators', () => {
    describe('💎 Unidade:', () => {
        describe('validateEmptyAndLenght6', () => {
            it('Dado a digitação em um campo quando nada for digitado então é informado que o campo é obrigatório', () => {
                expect(validateEmptyAndLenght6('')).toBe('*Este campo é obrigatório')
            })

            it('Dado a digitação em um campo quando digitar poucos caracteres então deve informar o mínimo de caracteres', () => {
                expect(validateEmptyAndLenght6('1234')).toBe('*Este campo precisa de no mínimo 6 caracteres')
            })

            it('Dado a digitação em um campo quando digitar 6 caracteres então deve retornar true', () => {
                expect(validateEmptyAndLenght6('123456')).toBe(true)
            })
        })

        describe('validateEmptyAndEmail', () => {
            it('Dado a digitação em um campo quando nada for digitado então é informado que o campo é obrigatório', () => {
                expect(validateEmptyAndEmail('')).toBe('*Este campo é obrigatório')
            })

            it('Dado a digitação em um campo quando digitar algo que não seja um email então deve informar que deve ser um e-mail', () => {
                expect(validateEmptyAndEmail('testando.carla.com')).toBe('*Este campo precisa ser um e-mail')
            })

            it('Dado a digitação em um campo quando digitar um email então deve retornar true', () => {
                expect(validateEmptyAndEmail('testando@gmail.com')).toBe(true)
            })
        })
    })
})
