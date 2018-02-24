module.exports = {
    "extends": "airbnb",
    "rules": {
      "linebreak-style": ["error", "windows"],
      "func-names": ["error", "never"],
      
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
      "react/no-multi-comp": [0, { "ignoreStateless": true }],
      "react/no-deprecated": [0]
    },
    "env": {
      "browser": true,
      "node": true
    }
};