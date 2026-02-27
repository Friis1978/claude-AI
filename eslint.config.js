import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

export default tseslint.config(
  { ignores: ['node_modules', 'dist', 'prisma/migrations'] },
  {
    files: ['src/**/*.vue', 'app/**/*.vue'],
    plugins: { vue: pluginVue },
    processor: pluginVue.processors['.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
    },
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      // turn off opinionated Vue style rules that conflict with our code
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
    },
  },
  {
    files: ['src/**/*.ts', 'app/**/*.ts', 'lib/**/*.ts'],
    extends: [...tseslint.configs.recommended],
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  }
)
