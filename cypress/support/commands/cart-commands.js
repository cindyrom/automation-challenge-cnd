import utilities from '../utilities';
import cart from '../elements/cart-elements';

const utils = new utilities();
//logic
Cypress.Commands.add('addToCart', () => {
    cy.visit('/#featured');
    utils.getById(cart.FEAUTRED_SECTION).should('be.visible').within(() => {
        utils.getByType(cart.ADD_TO_CART).first().should('be.visible').click({force : true});
    });
    cy.window().then((win) => {
        expect(win.localStorage.getItem('store-cart')).to.not.be.null;
    });
});

Cypress.Commands.add('openCart', () => {
    utils.getByData(cart.CART_BUTTON).should('be.visible').click();
    utils.getByClass(cart.CART_VIEW).should('be.visible');
    utils.getByClass(cart.CART_ITEM).should('be.visible');
});

Cypress.Commands.add('goToCheckout', () => {
    utils.getByClass(cart.CHECKOUT_BUTTON).should('be.enabled').click();
    cy.url().should('include', '/checkout');
});