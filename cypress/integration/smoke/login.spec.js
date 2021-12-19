/// <reference types="cypress" />
/// <reference types="../../support" />

describe('Login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('user should be able to login and logout', () => {
    cy.visit('/');
    cy.url().should('include', '/menu-items');

    cy.dataCy('login-button').click();
    cy.url().should('include', '/login');

    cy.dataCy('email-input').type(`${Cypress.env('TEST_USER_EMAIL')}`);
    cy.dataCy('password-input').type(`${Cypress.env('TEST_USER_PASSWORD')}`);
    cy.dataCy('sign-in-button').click();

    cy.url().should('include', '/menu-items');
    cy.dataCy('login-button').should('not.exist');
    cy.dataCy('logout-button').should('be.visible').click().should('not.exist');
    cy.dataCy('login-button').should('be.visible');
  });
});
