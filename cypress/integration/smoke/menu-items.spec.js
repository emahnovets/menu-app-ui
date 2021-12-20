/// <reference types="cypress" />
/// <reference types="../../support" />

describe('Menu Items', () => {
  beforeEach(() => {
    cy.login();

    cy.getFakeItem({ isActive: true }).then((activeMenuItem) => {
      cy.createMenuItem(activeMenuItem)
        .then((response) => response.body)
        .as('activeMenuItem');
    });

    cy.getFakeItem({ isActive: false }).then((inactiveMenuItem) => {
      cy.createMenuItem(inactiveMenuItem)
        .then((response) => response.body)
        .as('inactiveMenuItem');
    });

    cy.clearLocalStorage();
  });

  it('should display only active items for unauthorized users', function test() {
    cy.visit('/');
    cy.url().should('include', '/menu-items');

    cy.expectItemCard(this.activeMenuItem.id, this.activeMenuItem);
    cy.dataCy(`menu-item-card-${this.inactiveMenuItem.id}`).should('not.exist');
  });
});
