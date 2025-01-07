import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Ignore distribution files
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022, // Updated to the latest ECMAScript version
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } }, // Automatically detect the React version
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'warn', // Change to warn for better security
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Additional rules for better code quality
      'no-unused-vars': 'warn', // Warn for unused variables
      'prefer-const': 'error', // Require const for variables that are never reassigned
      'react/prop-types': 'off', // Disable prop-types if using TypeScript or if preferred
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.jsx', '.js'] }, // Allow both .jsx and .js files
      ],
      'react/jsx-indent': ['error', 2], // Enforce consistent indentation in JSX
      'react/jsx-indent-props': ['error', 2], // Enforce consistent indentation for props in JSX
      'react-hooks/rules-of-hooks': 'error', // Enforce rules of hooks
      'react-hooks/exhaustive-deps': 'warn', // Warn for missing dependencies in effect hooks
    },
  },
];
