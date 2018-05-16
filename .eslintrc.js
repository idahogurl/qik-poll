module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      'react/jsx-filename-extension': 0,
      "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [ "Link", "NavLink" ],
        "specialLink": [ "to" ],
      }]
    }
};
