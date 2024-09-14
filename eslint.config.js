// https://eslint.org/docs/rules/

import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import plus from 'eslint-config-plus';


// https://eslint.org/docs/latest/use/configure/configuration-files
export default [
    plus,
    ... tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    typescript: true
                }
            }
        },
        rules: {
            // ... any rules you want
        }
    }
];
