module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		commonjs: true,
		amd: true
	},
	extends: ["plugin:vue/essential", "eslint:recommended", "plugin:prettier/recommended"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["vue", "prettier"],
	// 0 = off, 1 = warn, 2 = error
	rules: {
		"prettier/prettier": [2, { endOfLine: "auto" }],
		"vue/no-unused-components": 0,
		"vue/multi-word-component-names": 0,
		"no-console": 0,
		"no-debugger": 1,
		"no-empty": 0,
		"no-unused-vars": 0,
		"no-regex-spaces": 2,
		"no-control-regex": 2,
		"no-duplicate-case": 2,
		"no-extra-boolean-cast": 2,
		"no-extra-semi": 2,
		"no-const-assign": 2
	}
};
