/// <reference types="cypress" />
/// <reference types="../../support" />

import * as faker from 'faker';

describe('Login (with fake api)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should send correct request body and save accessToken to LS', () => {
    cy.visit('/login');

    cy.fixture('login/access-token.json').then((accessTokenBody) => {
      cy.intercept(
        {
          method: 'POST',
          url: '/v1/auth/login',
        },
        { body: accessTokenBody, statusCode: 201 },
      ).as('login');

      const email = faker.internet.email();
      const password = faker.lorem.words(3);

      cy.dataCy('email-input').type(email);
      cy.dataCy('password-input').type(password);
      cy.dataCy('sign-in-button').click();

      cy.wait('@login').its('request.body').should('deep.equal', {
        email,
        password,
      });

      cy.url()
        .should('include', '/menu-items')
        .then(() => {
          expect(localStorage.getItem('accessToken')).to.eq(
            accessTokenBody.accessToken,
          );
        });
    });
  });

  it('should display error message if login failed', () => {
    cy.visit('/login');

    cy.intercept(
      {
        method: 'POST',
        url: '/v1/auth/login',
      },
      { statusCode: 401 },
    ).as('login');

    cy.dataCy('email-input').type(faker.internet.email());
    cy.dataCy('password-input').type(faker.lorem.words(3));
    cy.dataCy('sign-in-button').click();
    cy.dataCy('login-error-message').should('be.visible');
  });
});
