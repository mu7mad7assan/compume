module.exports = {
    env: {
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      quotes: ['error', 'single'],
      'prettier/prettier': 1,
      'no-console': 1,
      'no-var': 'error',
      'prefer-const': 'error',
      semi: ['error', 'always'],
    },
  }