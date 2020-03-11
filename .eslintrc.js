module.exports = {
    extends: [
        "airbnb",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["import", "@typescript-eslint", "react-hooks"],
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
        "import/extensions": [1, "never", { ts: "never", "json": "always" }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "indent": ["error", 4],
        "react/jsx-props-no-spreading": "off",
        "quotes": ["error", "double"],
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "comma-dangle": ["error", "never"],
        "react/jsx-filename-extension": ['warn', {	
            extensions: ['ts', '.tsx'],	
          }
        ],
        "react/sort-comp": [1, {
            "order": [
                "constructor",
                "lifecycle",
                "everything-else",
                "render"
            ]
          }]
          
    },
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            rules: {
                "no-unused-vars": ["off"],
                "semi": 1,
                "quote-props": ["error", "as-needed"]
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
