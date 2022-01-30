import * as faker from 'faker';
import { stringify } from 'qs';

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy*="${value}"]`));

Cypress.Commands.add('login', () => {
  cy.request('POST', `${Cypress.env('TEST_API_URL')}/v1/auth/login`, {
    email: Cypress.env('TEST_USER_EMAIL'),
    password: Cypress.env('TEST_USER_PASSWORD'),
  }).then((response) => {
    localStorage.setItem('accessToken', response.body.accessToken);
  });
});

Cypress.Commands.add('selectItem', (selectDataCy, selectItem) => {
  cy.dataCy(selectDataCy).click();
  cy.dataCy(`${selectDataCy}-item-${selectItem}`).click();
});

Cypress.Commands.add('createMenuItem', (createMenuItemBody) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('TEST_API_URL')}/v1/admin/menu-items`,
    body: createMenuItemBody,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
});

Cypress.Commands.add('expectItemCard', (id, menuItem, disabled) => {
  cy.dataCy(
    disabled ? `menu-item-card-${id}-inactive` : `menu-item-card-${id}`,
  ).within(() => {
    cy.dataCy('name-label').should('contain.text', menuItem.name);
    cy.dataCy('description-label').should('contain.text', menuItem.description);
    cy.dataCy('price-label').should(
      'contain.text',
      Intl.NumberFormat(undefined, {
        currency: menuItem.currency,
      }).format(menuItem.price / 100),
    );
  });
});

Cypress.Commands.add('getFakeItem', (menuItem) => {
  return {
    name: faker.random.word(),
    description: faker.random.words(10),
    isActive: faker.datatype.boolean(),
    price: faker.datatype.number({ min: 0, max: 10000 }),
    currency: faker.random.arrayElement(['USD', 'EUR']),
    ...menuItem,
  };
});

Cypress.Commands.add('expectItemCards', (menuItemsResponse) => {
  cy.dataCy('menu-item-card')
    .should('be.visible')
    .should('have.length', menuItemsResponse.data.getMenuItems.data.length);

  menuItemsResponse.data.getMenuItems.data.forEach((menuItem) => {
    cy.expectItemCard(menuItem.id, menuItem);
  });
});

Cypress.Commands.add('interceptGraphql', (params, response) => {
  return cy.intercept(
    {
      method: 'POST',
      url: `/graphql${stringify(params, {
        skipNulls: true,
        addQueryPrefix: true,
      })}**`,
    },
    response,
  );
});
