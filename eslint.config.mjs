import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import airbnb from 'eslint-config-airbnb'

const eslintConfig = [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      reactHooks: pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...airbnb.rules,
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]

export default eslintConfig
