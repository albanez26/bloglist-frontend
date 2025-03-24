import globals from 'globals'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
    },
    plugins: {
    },
    rules: {
      'indent': [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'windows'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 'off',
      "no-unused-vars": ["error", {
        "vars": "all",
        "args": "none",
        "caughtErrors": "all",
        "ignoreRestSiblings": false,
      }]
    },
  },
  {
    ignores: ["dist/**", "build/**"],
  },
]