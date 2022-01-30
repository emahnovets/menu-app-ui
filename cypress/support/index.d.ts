/// <reference types="cypress" />

declare namespace Cypress {
  interface MenuItem {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string;
    isActive: boolean;
    price: number;
    currency: string;
  }

  interface GraphqlParams extends Record<string, unknown> {
    operationName: string;
  }

  interface GraphqlResponseParams {
    fixture?: string;
    body?: Body;
    headers?: { [key: string]: string };
    statusCode?: number;
    forceNetworkError?: boolean;
    throttleKbps?: number;
    delay?: number;
  }

  interface Chainable {
    dataCy(value: string): Chainable<Element>;
    login(): void;
    selectItem(selectDataCy: string, selectItem: string): void;
    createMenuItem(
      createMenuItemBody: Omit<MenuItem, 'id'>,
    ): Cypress.Chainable<Cypress.Response<MenuItem>>;
    expectItemCard(id: number, menuItem: Partial<MenuItem>, disabled?: boolean);
    getFakeItem(
      menuItemOverrides: Partial<MenuItem>,
    ): Chainable<Omit<MenuItem, 'id'>>;
    expectItemCards(menuItemsResponse: { data: Array<Partial<MenuItem>> });
    interceptGraphql(
      graphqlParams: GraphqlParams,
      response?: GraphqlResponseParams,
    ): Chainable<null>;
  }
}
