module.exports = {
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 2019,
        ecmaFeatures: {
            "jsx": true
        },
        allowImportExportEverywhere: true
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:vue/recommended",
    ],
    env: {
        "es6"     : true,
        "node"    : true,
        "browser" : true,
        "commonjs": true,
    },
    plugins: [
        "vue",
    ],
    rules: {
        // first argument: 0 - silent, 1 - warning, 2 - error
        "max-len"             : [1, 120, 2, {
            "ignoreComments"  : true
        }],
        "keyword-spacing"     : [2, {
            "before"          : true,
            "after"           : true
        }],
        "object-curly-spacing": [2, "always"],
        "indent"              : [2, 2, {
            "SwitchCase"      : 1
        }],
        "semi"                : [2, "always"],
        "linebreak-style"     : [2, "unix"],
        "no-console"          : [1],
        'no-trailing-spaces'  : [2],
        "no-unused-vars"      : [1, {
            "vars"            : "local",
            "args"            : "none"
        }],
        "quotes"              : [2, "single"],
        "quote-props"         : [1, "consistent-as-needed"],

        "vue/html-indent"     : [2, 2],
        "vue/require-default-prop": [0],
        "vue/max-attributes-per-line": [0],
        "vue/component-name-in-template-casing": [0],
        "vue/singleline-html-element-content-newline": [0],

        "import/no-unresolved": [0]
    },
}