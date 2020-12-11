module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "@vue/airbnb",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
        "vue/component-name-in-template-casing": ["error", "kebab-case", {
            registeredComponentsOnly: false,
        }],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "no-plusplus": "off",
        "no-underscore-dangle": ["error", { allow: ["$_"] }],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
        quotes: [2, "double", { avoidEscape: true }],
        indent: ["error", 4],
        "lines-between-class-members": ["error", "always"],
        "padded-blocks": ["error", { classes: "always" }],
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/member-ordering": ["error", {
            default: [
                "public-constructor",
                "public-static-field",
                "public-instance-field",
                "public-static-method",
                "public-instance-method",
                "protected-static-method",
                "protected-instance-method",
                "protected-static-field",
                "protected-instance-field",
                "protected-constructor",
                "private-constructor",
                "private-static-field",
                "private-instance-field",
                "private-static-method",
                "private-instance-method",
            ],
        },
        ],
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                mocha: true,
            },
        },
    ],
};
