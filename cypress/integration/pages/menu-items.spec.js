/// <reference types="cypress" />
/// <reference types="../../support" />

describe('Menu Items (with fake api)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('should search through menu items', () => {
    cy.intercept('/v1/menu-items', {
      fixture: 'menu-items/menu-items.json',
    }).as('getMenuItems');
    cy.intercept('/v1/menu-items?query=a', {
      fixture: 'menu-items/menu-items-search-a.json',
    }).as('getMenuItemsSearchA');
    cy.intercept('/v1/menu-items?query=al', {
      fixture: 'menu-items/menu-items-search-al.json',
    }).as('getMenuItemsSearchAl');

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
  });
});
