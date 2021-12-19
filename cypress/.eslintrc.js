module.exports = {
  extends: ['plugin:cypress/recommended'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jest/valid-expect-in-promise': 'off',
    'jest/valid-expect': 'off',
    'testing-library/await-async-utils': 'off',
  },
};
