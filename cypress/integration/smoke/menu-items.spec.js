/// <reference types="cypress" />
/// <reference types="../../support" />

import * as faker from 'faker';

describe('Menu Items', () => {
  beforeEach(() => {
    cy.login();
    cy.createMenuItem({
      name: faker.random.word(),
      description: faker.random.words(10),
      isActive: true,
      price: faker.datatype.number({ min: 0, max: 10000 }),
      currency: faker.random.arrayElement(['USD', 'EUR']),
    })
      .then((response) => response.body)
      .as('activeMenuItem');
    cy.createMenuItem({
      name: faker.random.word(),
      description: faker.random.words(10),
      isActive: false,
      price: faker.datatype.number({ min: 0, max: 10000 }),
      currency: faker.random.arrayElement(['USD', 'EUR']),
    })
      .then((response) => response.body)
      .as('inactiveMenuItem');
    cy.clearLocalStorage();
  });

  it('should display only active items for unauthorized users', function test() {
    cy.visit('/');
    cy.url().should('include', '/menu-items');

    cy.expectItemCard(this.activeMenuItem.id, {
      ...this.activeMenuItem,
      price: this.activeMenuItem.price / 100,
    });
    cy.dataCy(`menu-item-card-${this.inactiveMenuItem.id}`).should('not.exist');
  });
});
