/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
  },
};
