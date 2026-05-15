import js from '@eslint/js';

const browserGlobals = {
  document: 'readonly',
  Event: 'readonly',
  HTMLElement: 'readonly',
  HTMLDivElement: 'readonly',
  KeyboardEvent: 'readonly',
  window: 'readonly',
};

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.github/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: browserGlobals,
    },
  },
  {
    files: ['vite.config.mjs', 'eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['postcss.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
      },
    },
  },
];
