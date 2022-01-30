// For vscode extension:
// https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql

module.exports = {
  projects: {
    app: {
      schema: ['schema.graphql'],
      documents: ['src/**/*.graphql'],
      extensions: {
        endpoints: {
          default: {
            url: 'http://localhost:3000/graphql',
          },
        },
        languageService: {
          useSchemaFileDefinitions: true,
        },
      },
    },
  },
};
