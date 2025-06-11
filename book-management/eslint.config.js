// eslint.config.js
import parser from '@typescript-eslint/parser';
import pluginTs from '@typescript-eslint/eslint-plugin';
import pluginVitest from 'eslint-plugin-vitest';
import prettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      vitest: pluginVitest,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'vitest/no-focused-tests': 'error',
      'vitest/no-disabled-tests': 'warn',
    },
  },
  {
    rules: {
      ...prettier.rules,
    },
  },
];
