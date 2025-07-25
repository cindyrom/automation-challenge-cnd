import utilities from '../utilities';
import uiLogin from '../elements/login-elements';

const utils = new utilities();

Cypress.Commands.add('typeDataLogin', (email, password) => {
    utils.getByData(uiLogin.LOGIN_BUTTON).should('be.visible','be.disabled',);
    utils.getByName(uiLogin.EMAIL).should('be.visible').type(email);
    utils.getByName(uiLogin.PASSWORD).should('be.visible').type(password);
});

Cypress.Commands.add('loginUser', () => {
    utils.getByData(uiLogin.LOGIN_BUTTON).should('be.visible', 'be.enabled').click();
    cy.url().should('include', '/');
    cy.intercept('https://api.laboratoriodetesting.com/api/v1/auth/login').as('login-api');
    cy.wait('@login-api').its('response.statusCode').should('equal', 201);
    cy.intercept('https://www.laboratoriodetesting.com/api/auth-cookie').as('auth-token');
    cy.wait('@auth-token').its('response.statusCode').should('equal', 200);
    cy.getCookie('__AUTH-TOKEN-APP').should('exist');
});

Cypress.Commands.add('failedLoginUser', () => {
    utils.getByData(uiLogin.LOGIN_BUTTON).should('be.visible', 'be.enabled').click();
    cy.url().should('include', '/auth/login');
    cy.intercept('https://api.laboratoriodetesting.com/api/v1/auth/login').as('login-api');
    cy.wait('@login-api').its('response.statusCode').should('equal', 401);
    cy.getCookie('__AUTH-TOKEN-APP').should('not.exist');
});


Cypress.Commands.add('emailFormatValidation', () => {
   const invalidEmail = ["a", "a@", "a@b", "a@1", "a@b."];
   invalidEmail.forEach ((element) => {
     utils.getByName(uiLogin.EMAIL).type(element);
     utils.getByClass(uiLogin.ERROR_MESSAGE).should('be.visible').should('contain.text', "Email inválido");
   });
});

Cypress.Commands.add('emptyEmailValidation', () => {
     utils.getByName(uiLogin.EMAIL).type(" ");
     utils.getByClass(uiLogin.ERROR_MESSAGE).should('be.visible').should('contain.text', "Este campo es requerido");
});

Cypress.Commands.add('emptyPasswordValidation', () => {
     utils.getByName(uiLogin.PASSWORD).type(" ");
     utils.getByClass(uiLogin.ERROR_MESSAGE).should('be.visible').should('contain.text', "Este campo es requerido");
});