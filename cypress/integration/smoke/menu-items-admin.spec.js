/// <reference types="cypress" />
/// <reference types="../../support" />

describe('Menu Items Admin', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.login();
    cy.getFakeItem({ isActive: true }).as('testMenuItem');
  });

  it('user be able to add new menu item', function test() {
    cy.visit('/');
    cy.url().should('include', '/menu-items');

    cy.dataCy('create-menu-item-button').click();
    cy.url().should('include', '/menu-items/create');

    cy.intercept({ method: 'POST', url: '/v1/admin/menu-items' }).as(
      'createMenuItem',
    );
    cy.intercept('/v1/admin/menu-items').as('getMenuItems');

    cy.dataCy('name-input').type(this.testMenuItem.name);
    cy.dataCy('description-input').type(this.testMenuItem.description);
    cy.dataCy('is-active-checkbox').should('be.checked');
    cy.dataCy('price-input').type(this.testMenuItem.price / 100);
    cy.selectItem('currency-select', this.testMenuItem.currency);
    cy.dataCy('submit-button').click();

    cy.url().should('include', '/menu-items');
    cy.wait('@getMenuItems');

    cy.wait('@createMenuItem')
      .its('response.body')
      .then((body) => {
        cy.expectItemCard(body.id, this.testMenuItem);
      });
  });

  it('user be able to edit menu item', function test() {
    cy.getFakeItem({ isActive: true }).then((fakeMenuItem) =>
      cy
        .createMenuItem(fakeMenuItem)
        .its('body')
        .then(({ id }) => {
          cy.visit('/');
          cy.dataCy(`menu-item-card-${id}`).within(() => {
            cy.dataCy('edit-button').click();
          });

          cy.url().should('include', `/menu-items/${id}`);
          cy.intercept('/v1/admin/menu-items').as('getMenuItems');

          cy.dataCy('name-input').clear().type(this.testMenuItem.name);
          cy.dataCy('description-input')
            .clear()
            .type(this.testMenuItem.description);
          cy.dataCy('is-active-checkbox').should('be.checked');
          cy.dataCy('price-input')
            .clear()
            .type(this.testMenuItem.price / 100);
          cy.selectItem('currency-select', this.testMenuItem.currency);
          cy.dataCy('submit-button').click();

          cy.url().should('include', '/menu-items');
          cy.wait('@getMenuItems');

          cy.expectItemCard(id, this.testMenuItem);
        }),
    );
  });

  it('user be able to delete menu item', function test() {
    cy.createMenuItem(this.testMenuItem).then((response) => {
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

  it('user be able to disable menu item', function test() {
    cy.createMenuItem(this.testMenuItem).then((response) => {
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

      cy.expectItemCard(id, this.testMenuItem, true);
    });
  });
});
