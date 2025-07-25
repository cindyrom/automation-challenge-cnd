const userData = require('../fixtures/data.json');
const path = 'auth/login';

  beforeEach(() => {
  cy.visit(path);
  });

describe('Login Scenarios', () => {

  it('Successful Login and cookie validation', function () {
    cy.typeDataLogin(userData.validUser, userData.validPassword);
    cy.loginUser();
  });

  it('Failed Login', function () {
    cy.typeDataLogin('abc@test.com', '11111111');
    cy.failedLoginUser();
  });

  it('Wrong email format validation', function () {
    cy.emailFormatValidation();
  });

  it('Empty email validation', function () {
    cy.emptyEmailValidation();
  });

  it('Empty password validation', function () {
    cy.emptyPasswordValidation();
  });
});

