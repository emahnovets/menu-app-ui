/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // eslint-disable-next-line global-require
  require('@cypress/code-coverage/task')(on, config);

  return config;
};
