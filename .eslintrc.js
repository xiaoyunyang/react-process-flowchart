module.exports = {
    extends: [
        // "airbnb",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["import", "@typescript-eslint"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        sourceType: "module",
        useJSXTextNode: true,
        project: "./tsconfig.json"
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "import/extensions": [1, "never", { ts: "never" }],
        // "react/jsx-indent": [true, 6],
        // "@typescript-eslint/indent": [false, "spaces", 8],
        "react/jsx-filename-extension": false
    },
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            rules: {
                "no-unused-vars": ["off"],
                "semi": 1
            }
        }
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            },
            "eslint-import-resolver-typescript": true
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        react: {
            version: "detect"
        }
    },
    env: {
        jest: true,
        browser: true
    }
};
