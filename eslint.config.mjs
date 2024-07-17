import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

const baseConfig = {
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.ts', '.js', '.json']
      }
    },
    'react': {
      'pragma': 'React',
      'version': 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'max-len': [1, 120, 2],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'prefer-destructuring': ['warn', { 'object': true, 'array': false }],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': 'off'
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      rules: {
        'dot-notation': 'off'
      }
    }
  ]
};

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  baseConfig,
];