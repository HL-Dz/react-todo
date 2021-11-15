module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:react/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint"
  ],
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "semi": ["error", "never"]
  }
}






