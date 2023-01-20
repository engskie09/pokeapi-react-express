module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        amd: true,
    },
    extends: ['airbnb', 'prettier', 'plugin:react/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'testing-library'],
    overrides: [
        {
            files: ['**/*.test.ts', '**/*.test.tsx'],
            env: { jest: true, 'jest/globals': true },
            plugins: ['jest'],
            extends: ['plugin:testing-library/react', 'plugin:jest/all'],
        },
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'prettier/prettier': ['error'],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ignorePackages: true,
                pattern: {
                    js: 'never',
                    mjs: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                    '': 'never',
                },
            },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/jsx-indent': ['off', 4, { checkAttributes: true, indentLogicalExpressions: true }],
        'import/prefer-default-export': 'off',
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        indent: [
            'off',
            4,
            {
                ignoredNodes: [
                    'JSXElement',
                    'JSXElement > *',
                    'JSXAttribute',
                    'JSXIdentifier',
                    'JSXNamespacedName',
                    'JSXMemberExpression',
                    'JSXSpreadAttribute',
                    'JSXExpressionContainer',
                    'JSXOpeningElement',
                    'JSXClosingElement',
                    'JSXText',
                    'JSXEmptyExpression',
                    'JSXSpreadChild',
                ],
            },
        ],
        'import/no-unresolved': 'off',
        'no-console': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-nested-ternary': 'off',
        'react/require-default-props': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-param-reassign': ['error', { props: false }],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },
};
