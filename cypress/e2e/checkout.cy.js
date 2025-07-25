const userData = require('../fixtures/data.json');
const path = '/auth/login';

  before(() => {
  cy.visit(path);
  });

describe('Checkout Scenarios', () => {

    it('Complete Purchase', function () {
        cy.typeDataLogin(userData.validUser, userData.validPassword);
        cy.loginUser();
        cy.addToCart();
        cy.openCart();
        cy.goToCheckout();
        cy.fillCheckoutForm(
            userData.checkout[0].name, 
            userData.checkout[0].lastName, 
            userData.checkout[0].email, 
            userData.checkout[0].address,
            userData.checkout[0].country,
            userData.checkout[0].nameHolder,
            userData.checkout[0].cardNumber,
            userData.checkout[0].expiryDate,
            userData.checkout[0].securityCode
        );
        cy.completeOrder();
        cy.successPaymentModal();
      });
    
});


