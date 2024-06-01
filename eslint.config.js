import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from "eslint-config-prettier";
import tsParser from "@typescript-eslint/parser";
import svelteParser from "svelte-eslint-parser";

export default [
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        extraFileExtensions: [".svelte"],
      },
    },
  },
  {
    files: ["**/*.svelte", "*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
      },
    },
  },
];