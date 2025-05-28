module.exports = {
	extends: [
		'standard-with-typescript',
		'plugin:react/recommended',
		'plugin:react-native/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		'@typescript-eslint',
		'react',
		'react-hooks',
		'react-native',
		'prettier',
	],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		quotes: ['error', 'single'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
