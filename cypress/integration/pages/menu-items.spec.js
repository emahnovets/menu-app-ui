/// <reference types="cypress" />
/// <reference types="../../support" />

describe('Menu Items (with fake api)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should search through menu items', () => {
    cy.interceptGraphql(
      { operationName: 'MenuItemsList' },
      { fixture: 'menu-items/menu-items.json' },
    ).as('getMenuItems');
    cy.interceptGraphql(
      { operationName: 'MenuItemsList', query: 'a' },
      { fixture: 'menu-items/menu-items-search-a.json' },
    ).as('getMenuItemsSearchA');
    cy.interceptGraphql(
      { operationName: 'MenuItemsList', query: 'al' },
      { fixture: 'menu-items/menu-items-search-al.json' },
    ).as('getMenuItemsSearchAl');
    cy.interceptGraphql(
      { operationName: 'MenuItemsList', query: 'alt' },
      { fixture: 'menu-items/menu-items-empty.json' },
    ).as('getMenuItemsSearchAlt');

    cy.visit('/');

    cy.wait('@getMenuItems')
      .its('response.body')
      .then((menuItems) => {
        cy.expectItemCards(menuItems);
      });

    cy.dataCy('search-input').type('a');

    cy.wait('@getMenuItemsSearchA')
      .its('response.body')
      .then((menuItems) => {
        cy.expectItemCards(menuItems);
      });

    cy.dataCy('search-input').type('l');

    cy.wait('@getMenuItemsSearchAl')
      .its('response.body')
      .then((menuItems) => {
        cy.expectItemCards(menuItems);
      });

    cy.dataCy('search-input').type('t');
    cy.wait('@getMenuItemsSearchAlt');
    cy.dataCy('no-items-message').should('be.visible');
  });

  it('should hide admin controls for anonymous users', () => {
    cy.interceptGraphql(
      { operationName: 'MenuItemsList' },
      { fixture: 'menu-items/menu-items.json' },
    ).as('getMenuItems');

    cy.visit('/');

    cy.wait('@getMenuItems');

    cy.dataCy('menu-item-card').should('be.visible');
    cy.dataCy('create-menu-item-button').should('not.exist');
    cy.dataCy('edit-menu-item-button').should('not.exist');
    cy.dataCy('delete-menu-item-button').should('not.exist');
  });
});
