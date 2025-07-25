import utilities from '../utilities';
import form from '../elements/checkout-elements';
import uiRegister from '../elements/register-elements';
const utils = new utilities();

Cypress.Commands.add('fillCheckoutForm', 
    (name, lastName, email, address, country, nameHolder, cardNumber, expiryDate, securityCode ) => {
        utils.getByData(form.HEADER).invoke('css', 'visibility', 'hidden');
        cy.get('.my-5 > .bg-primaryColor').should('be.visible','be.disabled');
        utils.getByName(form.NAME).should('be.visible').type(name);
        utils.getByName(form.LAST_NAME).should('be.visible').type(lastName);
        utils.getByName(form.EMAIL).should('be.visible').type(email);
        utils.getByName(form.ADDRESS).should('be.visible').type(address);
        utils.getByName(form.COUNTRY).should('be.visible').select(country);
        utils.getByName(form.CARD_NAME).should('be.visible').type(nameHolder);
        utils.getByName(form.CARD_NUMBER).should('be.visible').type(cardNumber);
        utils.getByName(form.EXPIRY_DATE).should('be.visible').type(expiryDate);
        utils.getByName(form.SECURITY_CODE).should('be.visible').type(securityCode);
});

Cypress.Commands.add('completeOrder', () => {
    cy.get('.my-5 > .bg-primaryColor').should('be.visible').click();
    cy.intercept('https://api.laboratoriodetesting.com/api/v1/orders').as('orders-api');
    cy.wait('@orders-api').its('response.statusCode').should('equal', 201);
});

Cypress.Commands.add('successPaymentModal', () => {
    utils.getByClass(uiRegister.SUCCESS_MODAL).should('be.visible');
    utils.getByClass(uiRegister.MODAL_BUTTON).should('be.visible').click();
    cy.url().should('include', '/my-account');
});

