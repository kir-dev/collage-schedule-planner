import eslint from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import SimpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default [
  {
    name: 'eslint',
    plugins: {
      prettier: eslintPluginPrettier,
      simpleImportSort: SimpleImportSort,
    },
    rules: {
      'prettier/prettier': 'warn',
      'simpleImportSort/imports': 'error',
      'simpleImportSort/exports': 'error',
      camelcase: [
        'error',
        {
          properties: 'never',
        },
      ],
      eqeqeq: 'error',
      'max-depth': 'error',
      'max-lines': 'error',
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-eval': 'error',
      'no-implicit-coercion': 'error',
      'no-lonely-if': 'error',
      'no-nested-ternary': 'error',
      'no-negated-condition': 'error',
      'no-unneeded-ternary': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-useless-concat': 'error',
      'no-void': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-template': 'error',
      yoda: 'error',
      'no-unused-vars': 'off',
    },
    ignores: ['**/*.d.ts', 'node_modules', 'dist', '.idea', '.next', '**/*.prettierrc.js', '**/.eslintrc.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
];
