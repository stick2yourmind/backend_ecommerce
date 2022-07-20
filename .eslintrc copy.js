module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'sort-keys-fix'
  ],
  rules: {
    curly: ['warn', 'multi'],
    'max-len': ['warn', {
      code: 100,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreTrailingComments: true
    }],
    'sort-keys': ['warn', 'asc', { caseSensitive: true, minKeys: 2, natural: true }],
    'sort-keys-fix/sort-keys-fix': 'warn'
  }
}
