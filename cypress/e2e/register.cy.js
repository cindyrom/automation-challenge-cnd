const userData = require('../fixtures/data.json');
const path = 'auth/signup';

  beforeEach(() => {
  cy.visit(path);
  });

describe('Register Scenarios', () => {

  it('Register a new user successfully', function () {
    cy.fillRegisterForm(userData.email, userData.name, userData.password);
    cy.registerUser();
    cy.successOperationModal();
  });

  it('Try to register an existing user', function () {
    cy.fillRegisterForm(userData.registered_email, userData.name, userData.password);
    cy.registerExistingUser();
    cy.failedOperationModal();
  });

  it('Wrong email format validation', function () {
    cy.emailFormatValidation();
  });

  it('Empty email validation', function () {
    cy.emptyEmailValidation();
  });

  it('Empty name validation', function () {
    cy.emptyFieldsValidation();
  });

});


