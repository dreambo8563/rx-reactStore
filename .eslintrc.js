module.exports = {
    // Enable starter rules
    "extends": [
        "eslint:recommended", "plugin:react/recommended"
    ],
    // Enable babel-eslint if you rely on custom Babel features. Not needed if you
    // rely on standard ES6 features alone.
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": true,
        // Enable JSX
        "ecmaFeatures": {
            "jsx": true
        }
    },
    // Enable eslint-plugin-react
    "plugins": ["react"],
    "rules": {}
};