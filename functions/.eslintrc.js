module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'indent': ['error', 2],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'max-len': ['error', {code: 500, ignoreUrls: true}],
    'quotes': ['error', 'single', 'avoid-escape'],
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
