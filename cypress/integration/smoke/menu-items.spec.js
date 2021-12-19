/// <reference types="cypress" />
/// <reference types="../../support" />

import * as faker from 'faker';

describe('Menu Items', () => {
  let activeMenuItem;
  let inactiveMenuItem;

  beforeEach(() => {
    cy.login();
    cy.createMenuItem({
      name: faker.random.word(),
      description: faker.random.words(10),
      isActive: true,
      price: faker.datatype.number({ min: 0, max: 10000 }),
      currency: faker.random.arrayElement(['USD', 'EUR']),
    }).then((response) => {
      activeMenuItem = response.body;
    });
    cy.createMenuItem({
      name: faker.random.word(),
      description: faker.random.words(10),
      isActive: false,
      price: faker.datatype.number({ min: 0, max: 10000 }),
      currency: faker.random.arrayElement(['USD', 'EUR']),
    }).then((response) => {
      inactiveMenuItem = response.body;
    });
    cy.clearLocalStorage();
  });

  it('should display only active items for unauthorized users', () => {
    cy.visit('/');
    cy.url().should('include', '/menu-items');

    cy.expectItemCard(activeMenuItem.id, {
      ...activeMenuItem,
      price: activeMenuItem.price / 100,
    });
    cy.dataCy(`menu-item-card-${inactiveMenuItem.id}`).should('not.exist');
  });
});
