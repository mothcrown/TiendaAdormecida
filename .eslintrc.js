module.exports = {
    "extends": "airbnb",
    "rules": {
      "linebreak-style": ["error", "windows"],
      "func-names": ["error", "never"],
      "prefer-arrow-callback": ["off"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
      "react/no-multi-comp": [0, { "ignoreStateless": true }],
      "react/no-deprecated": [0],
      "react/jsx-no-undef": [0],
      "react/prop-types": [0],
      "jsx-a11y/anchor-is-valid": [0]
    },
    "env": {
      "browser": true,
      "node": true
    }
};