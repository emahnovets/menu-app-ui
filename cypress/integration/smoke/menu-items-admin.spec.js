/// <reference types="cypress" />
/// <reference types="../../support" />

import * as faker from 'faker';

describe('Menu Items Admin', () => {
  let testMenuItem;

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login();

    testMenuItem = {
      name: faker.random.word(),
      description: faker.random.words(10),
      isActive: true,
      price: faker.datatype.number({ min: 0, max: 100, precision: 0.01 }),
      currency: faker.random.arrayElement(['USD', 'EUR']),
    };
  });

  it('user be able to add new menu item', () => {
    cy.visit('/');
    cy.url().should('include', '/menu-items');

    cy.dataCy('create-menu-item-button').click();
    cy.url().should('include', '/menu-items/create');

    cy.intercept({ method: 'POST', url: '/v1/admin/menu-items' }).as(
      'createMenuItem',
    );
    cy.intercept('/v1/admin/menu-items').as('getMenuItems');

    cy.dataCy('name-input').type(testMenuItem.name);
    cy.dataCy('description-input').type(testMenuItem.description);
    cy.dataCy('is-active-checkbox').should('be.checked');
    cy.dataCy('price-input').type(testMenuItem.price);
    cy.selectItem('currency-select', testMenuItem.currency);
    cy.dataCy('submit-button').click();

    cy.url().should('include', '/menu-items');
    cy.wait('@getMenuItems');

    cy.wait('@createMenuItem')
      .its('response.body')
      .then((body) => {
        cy.expectItemCard(body.id, testMenuItem);
      });
  });

  it('user be able to edit menu item', () => {
    const newMenuItem = {
      name: faker.random.word(),
      description: faker.random.words(10),
      isActive: true,
      price: Math.round(
        faker.datatype.number({ min: 0, max: 100, precision: 0.01 }) * 100,
      ),
      currency: faker.random.arrayElement(['USD', 'EUR']),
    };
    cy.createMenuItem(newMenuItem).then((response) => {
      const { id } = response.body;

      cy.visit('/');
      cy.dataCy(`menu-item-card-${id}`).within(() => {
        cy.dataCy('edit-button').click();
      });

      cy.url().should('include', `/menu-items/${id}`);
      cy.intercept('/v1/admin/menu-items').as('getMenuItems');

      cy.dataCy('name-input').clear().type(testMenuItem.name);
      cy.dataCy('description-input').clear().type(testMenuItem.description);
      cy.dataCy('is-active-checkbox').should('be.checked');
      cy.dataCy('price-input').clear().type(testMenuItem.price);
      cy.selectItem('currency-select', testMenuItem.currency);
      cy.dataCy('submit-button').click();

      cy.url().should('include', '/menu-items');
      cy.wait('@getMenuItems');

      cy.expectItemCard(id, testMenuItem);
    });
  });

  it('user be able to delete menu item', () => {
    cy.createMenuItem({
      ...testMenuItem,
      price: Math.round(testMenuItem.price * 100),
    }).then((response) => {
      const { id } = response.body;

      cy.visit('/');

      cy.dataCy(`menu-item-card-${id}`).within(() => {
        cy.dataCy('delete-button').click();
      });
      cy.url().should('include', `/menu-items/${id}/delete`);
      cy.intercept('/v1/admin/menu-items').as('getMenuItems');

      cy.dataCy('delete-confirmation-dialog')
        .should('be.visible')
        .within(() => {
          cy.dataCy('delete-button').click();
        });

      cy.url().should('include', '/menu-items');
      cy.wait('@getMenuItems');

      cy.dataCy(`menu-item-card-${id}`).should('not.exist');
    });
  });

  it('user be able to disable menu item', () => {
    cy.createMenuItem({
      ...testMenuItem,
      price: Math.round(testMenuItem.price * 100),
    }).then((response) => {
      const { id } = response.body;

      cy.visit('/');

      cy.dataCy(`menu-item-card-${id}`).within(() => {
        cy.dataCy('edit-button').click();
      });
      cy.url().should('include', `/menu-items/${id}`);
      cy.intercept('/v1/admin/menu-items').as('getMenuItems');

      cy.dataCy('is-active-checkbox').click();
      cy.dataCy('submit-button').click();

      cy.url().should('include', '/menu-items');
      cy.wait('@getMenuItems');

      cy.expectItemCard(id, testMenuItem, true);
    });
  });
});
