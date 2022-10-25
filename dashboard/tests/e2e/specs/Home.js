describe('Home', () => {
    const APP_URL = process.env.APP_URL || 'http://localhost:8080'
    describe('🧪 E2E:', () => {
        it('Dado o botão "Crie uma conta grátis" Quando clicado Então deve abrir o modal', () => {
            cy.visit(APP_URL)

            cy.get('#create-account-button').click()

            cy.get('#modal-create-account')
        })

        it('Dado o header botão "Crie uma conta grátis" Quando clicado Então deve abrir o modal', () => {
            cy.visit(APP_URL)

            cy.get('#create-account-button').click()

            cy.get('#modal-create-account')
        })

        it('Dado o botão "Crie uma conta" do header Quando clicado Então deve abrir o modal', () => {
            cy.visit(APP_URL)

            cy.get('#button-create').click()

            cy.get('#modal-create-account')
        })

        it('Dado o botão "Entrar" do header Quando clicado Então deve abrir o modal', () => {
            cy.visit(APP_URL)

            cy.get('#button-login').click()

            cy.get('#modal-login-account')
        })

        it('Dado o modal de login Quando preenchido com email e senha Então deve abrir a página de feedbacks', () => {
            cy.visit(APP_URL)
            cy.get('#button-login').click()
            cy.get('#modal-login-account')

            cy.get('#modal-email-field').type('igor@igor.me')
            cy.get('#modal-password-field').type('1234')
            cy.get('#submit-button-login').click()

            cy.url().should('include', '/feedbacks')
        })

        it('Dado o modal de login Quando preenchido com email Inválido e senha Então deve exibir um erro', () => {
            cy.visit(APP_URL)
            cy.get('#button-login').click()
            cy.get('#modal-login-account')

            cy.get('#modal-email-field').type('igor@')
            cy.get('#modal-password-field').type('1234')
            cy.get('#submit-button-login').click()

            cy.get('#email-error')
        })

        it('Dado o botão para sair da conta Quando clicado Então deve abrir a Home', () => {
            cy.visit(APP_URL)
            cy.get('#button-login').click()
            cy.get('#modal-login-account')

            cy.get('#modal-email-field').type('igor@igor.me')
            cy.get('#modal-password-field').type('1234')
            cy.get('#submit-button-login').click()

            cy.url().should('include', '/feedbacks')
            cy.wait(1000)
            cy.get('#logout-button').click()
            cy.url().should('include', '/')
        })
    })
})
