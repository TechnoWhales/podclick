import path from 'path'
import { fileURLToPath } from 'url'

import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import perfectionist from 'eslint-plugin-perfectionist'
import * as tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
  {
    ignores: [
      '.storybook/**',
      'vitest.config.ts',
      'next.config.ts',
      '.next/**'
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        ecmaVersion: 2021,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      perfectionist,
      '@next/next': nextPlugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      ...nextPlugin.configs.recommended.rules,

      'arrow-parens': 'off',
      'consistent-return': 'off',
      curly: ['error', 'all'],
      'import/extensions': [
        'error',
        {
          css: 'always',
          json: 'always',
          scss: 'always',
          svg: 'always',
        },
      ],
      'import/no-duplicates': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'max-lines': ['error', 300],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'off',
      'no-duplicate-imports': 'error',
      'no-empty-pattern': 'off',
      'no-nested-ternary': 'error',
      'no-undef': 'warn',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
      ],

      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: {
            type: {
              react: 'react',
            },
            value: {
              react: ['react', 'react-*'],
            },
          },
          groups: [
            'type',
            'react',
            'builtin',
            'external',
            'internal-type',
            'internal',
            'side-effect',
            'style',
          ],
          newlinesBetween: 'always',
          order: 'asc',
          type: 'natural',
        },
      ],

      'prefer-const': 'error',
      'react/button-has-type': 'error',
      'react/display-name': 'off',
      'react/jsx-boolean-value': ['error'],
      'react/jsx-curly-brace-presence': [
        'error',
        { children: 'ignore', propElementValues: 'always', props: 'always' },
      ],
      'react/jsx-fragments': ['error'],
      'react/prop-types': 'off',
      'react/void-dom-elements-no-children': ['error'],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          paths: ['src'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },

  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      perfectionist,
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.stories.tsx'],
    rules: {
      'no-console': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]
