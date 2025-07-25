import utilities from '../utilities';
import uiRegister from '../elements/register-elements';
//import { faker } from '@faker-js/faker'; 
const utils = new utilities();


Cypress.Commands.add('fillRegisterForm', (email, name, password) => {
    utils.getByData(uiRegister.SIGNUP_BUTTON).should('be.visible','be.disabled');
    utils.getByName(uiRegister.EMAIL).should('be.visible').type(email);
    utils.getByName(uiRegister.NAME).should('be.visible').type(name);
    utils.getByName(uiRegister.PASSWORD).should('be.visible').type(password);
    utils.getByName(uiRegister.PASSWORD_CONFIRMATION).should('be.visible').type(password);
});

Cypress.Commands.add('registerUser', () => {
    utils.getByData(uiRegister.SIGNUP_BUTTON).should('be.visible','be.enabled').click();
    cy.intercept('https://api.laboratoriodetesting.com/api/v1/auth/signup').as('register-api');
    cy.wait('@register-api').its('response.statusCode').should('equal', 201);
});

Cypress.Commands.add('successOperationModal', () => {
    utils.getByClass(uiRegister.SUCCESS_MODAL).should('be.visible');
    utils.getByClass(uiRegister.MODAL_BUTTON).should('be.visible').click();
    cy.url().should('include', '/auth/login');
});

Cypress.Commands.add('registerExistingUser', () => {
    utils.getByData(uiRegister.SIGNUP_BUTTON).click();
    cy.intercept('https://api.laboratoriodetesting.com/api/v1/auth/signup').as('register-api');
    cy.wait('@register-api').its('response.statusCode').should('equal', 409);
});

Cypress.Commands.add('failedOperationModal', () => {
    utils.getByClass(uiRegister.ERROR_MODAL).should('be.visible');
    utils.getByClass(uiRegister.MODAL_BUTTON).should('be.visible').click();
    utils.getByClass(uiRegister.ERROR_MODAL).should('not.exist');
});

Cypress.Commands.add('emptyEmailValidation', () => {
     utils.getByName(uiRegister.EMAIL).type("a").type("{backspace}");
     utils.getByClass(uiRegister.ERROR_MESSAGE).should('be.visible').should('contain.text', "Este campo es requerido");
});

Cypress.Commands.add('emptyFieldsValidation', () => {
     utils.getByName(uiRegister.NAME).type(" ");
     utils.getByClass(uiRegister.ERROR_MESSAGE).should('be.visible').should('contain.text', "Este campo es requerido");
});