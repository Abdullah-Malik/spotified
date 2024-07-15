import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.js', '.json'],
        },
      },
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      'jsx-a11y': eslintPluginJsxA11y,
    },
    rules: {
      'max-len': ['warn', { code: 120, tabWidth: 2 }],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'prefer-destructuring': ['warn', { object: true, array: false }],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-underscore-dangle': 'off',
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      ...eslintPluginImport.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'dot-notation': 'off',
    },
  }
);