/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    dataCy(value: string): Chainable<Element>;
    login(): void;
    selectItem(selectDataCy: string, selectItem: string): void;
    createMenuItem(
      createMenuItemBody: Record<string, unknown>,
    ): Cypress.Chainable<Cypress.Response<Record<string, unknown>>>;
    expectItemCard(
      id: number,
      menuItem: Record<string, unknown>,
      disabled?: boolean,
    );
    expectItemCards(menuItemsResponse: {
      data: Array<Record<string, unknown>>;
    });
  }
}
