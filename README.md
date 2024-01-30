# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

становить eslint глобально (для плагина VSCode)

npm install eslint -g

Установить prettier глобально (для плагина VSCode)

npm install prettier -g

Установить eslint в проект

npm install eslint eslint-plugin-react -D

Установить prettier в проект

npm install eslint-config-prettier eslint-plugin-prettier prettier -D
scripts для package.json

"lint": "eslint .","lint:fix": "eslint --fix","format": "prettier --write './\*_/_.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"

extends для .eslintrc

"plugin:prettier/recommended",
# viteReactEslintPrettier
