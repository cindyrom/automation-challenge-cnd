const userData = require('../fixtures/data.json');
const path = 'auth/login';

describe('Add to Cart Scenarios', () => {
    before(() => {
        cy.visit(path);
    });

  it('Successful Login', function () {
    cy.typeDataLogin(userData.validUser, userData.validPassword);
    cy.loginUser();
  });

  it('Add to cart and verify product in the cart', function () {
    cy.addToCart();
    cy.openCart();
    cy.goToCheckout();
  });

});