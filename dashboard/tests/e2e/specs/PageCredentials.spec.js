const APP_URL = process.env.APP_URL || 'http://localhost:8080';
describe('🧪 E2E:', () => {
    it('Dado o botão de gerar uma nova ApiKey Quando clicado Então deve gerar uma nova chave', () => {
        cy.visit(APP_URL);
        cy.get('#button-login').click();
        cy.get('#modal-login-account');

        cy.get('#modal-email-field').type('igor@igor.me');
        cy.get('#modal-password-field').type('1234');
        cy.get('#submit-button-login').click();

        cy.wait(4000);
        cy.visit(`${APP_URL}/credentials`);
        cy.wait(2000);

        const oldApikey = cy.get('#api-key').invoke('text');
        cy.get('#button-generate-api-key').click();
        cy.wait(2000);
        const newApikey = cy.get('#api-key').invoke('text');

        expect(oldApikey).to.not.equal(newApikey);
    });
});
