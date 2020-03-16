module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:jest/all'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: 'never',
      },
    ],
  },
};
