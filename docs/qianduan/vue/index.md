# Vue.js 简介

## 什么是 Vue.js？
Vue.js（通常简称为Vue）是一个基于JavaScript的前端框架，用于构建用户界面。它专注于视图层，通过封装和提供一系列的易用组件和工具，使得开发者能够快速构建交互式的单页面应用(SPA)和动态网页。

## 注意点：
有些环境，如 Google Chrome Apps，会强制应用内容安全策略 (CSP)，不能使用 `new Function()` 对表达式求值。这时可以用 `CSP `兼容版本。完整版本依赖于该功能来编译模板，所以无法在这些环境下使用。
另一方面，运行时版本则是完全兼容 `CSP` 的。当通过 `webpack + vue-loader` 或者 `Browserify + vueify` 构建时，模板将被预编译为 `render` 函数，可以在 `CSP` 环境中完美运行。