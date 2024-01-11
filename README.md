# eleventy-plugin-postcss

**An [Eleventy](https://www.11ty.dev) plugin for processing CSS files with [PostCSS](https://postcss.org).**

[![npm](https://img.shields.io/npm/v/@jgarber/eleventy-plugin-postcss.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/eleventy-plugin-postcss)
[![Downloads](https://img.shields.io/npm/dt/@jgarber/eleventy-plugin-postcss.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/eleventy-plugin-postcss)
[![Build](https://img.shields.io/github/actions/workflow/status/jgarber623/eleventy-plugin-postcss/ci.yml?branch=main&logo=github&style=for-the-badge)](https://github.com/jgarber623/eleventy-plugin-postcss/actions/workflows/ci.yml)

## Usage

```sh
npm install --save-dev @jgarber/eleventy-plugin-postcss
```

```js
// eleventy.config.js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(require('@jgarber/eleventy-plugin-postcss'));
};
```

```js
// postcss.config.js
module.exports = {
  map: 'inline',
  plugins: [
    require('postcss-nesting'),
    require('cssnano')
  ]
};
```
