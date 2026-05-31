import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["main.js", "dist/**", "node_modules/**", "vault/**"],
	},
	...tseslint.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ args: "none", argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-empty-function": "off",
		},
	},
);
