module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "array-callback-return": "warn",
        "no-await-in-loop": "warn",
        "no-constant-binary-expression": "warn",
        "no-constructor-return": "warn",
        "no-duplicate-imports": "warn",
        "no-new-native-nonconstructor": "warn",
        "no-promise-executor-return": "warn",
        "no-self-compare": "warn",
        "no-template-curly-in-string": "warn",
        "no-unmodified-loop-condition": "warn",
        "no-unreachable-loop": "warn",
        "no-unused-private-class-members": "warn",
        "no-use-before-define": "warn",
        "arrow-body-style": "warn"
    }
}
