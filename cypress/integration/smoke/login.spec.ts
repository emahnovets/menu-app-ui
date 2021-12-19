/// <reference types="cypress" />

describe('Login', () => {
  it('user should be able to login', () => {
    cy.visit('/');
    cy.url().should('include', '/menu-items');

    cy.dataCy('login-button').click();
    cy.url().should('include', '/login');

    cy.dataCy('email-input').type(`${Cypress.env('TEST_USER_EMAIL')}`);
    cy.dataCy('password-input').type(`${Cypress.env('TEST_USER_PASSWORD')}`);
    cy.dataCy('sign-in-button').click();

    cy.url().should('include', '/menu-items');
    cy.dataCy('logout-button').should('be.visible');
    cy.dataCy('login-button').should('not.exist');
  });
});
