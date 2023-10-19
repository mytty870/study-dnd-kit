module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: '*.json5',
      options: { parser: 'json' },
    },
    {
      files: '*.html.ejs',
      options: { parser: 'html' },
    },
  ],
}
