# eleventy-plugin-postcss

**An [Eleventy](https://www.11ty.dev) plugin for processing CSS files with [PostCSS](https://postcss.org).**

[![npm](https://img.shields.io/npm/v/@jgarber/eleventy-plugin-postcss.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/eleventy-plugin-postcss)
[![Downloads](https://img.shields.io/npm/dt/@jgarber/eleventy-plugin-postcss.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/eleventy-plugin-postcss)
[![Build](https://img.shields.io/github/actions/workflow/status/jgarber623/eleventy-plugin-postcss/ci.yml?branch=main&logo=github&style=for-the-badge)](https://github.com/jgarber623/eleventy-plugin-postcss/actions/workflows/ci.yml)

## Usage

First, add the plugin as [a development dependency](https://docs.npmjs.com/cli/configuring-npm/package-json#devdependencies) to your project's `package.json` file:

```sh
npm install --save-dev @jgarber/eleventy-plugin-postcss
```

Next, add the plugin to your project's [Eleventy configuration file](https://www.11ty.dev/docs/config/#default-filenames) (e.g. `eleventy.config.js`):

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(require('@jgarber/eleventy-plugin-postcss'));
};
```

Optionally, add a PostCSS configuration file to your project:

```js
module.exports = {
  map: 'inline',
  plugins: [
    require('postcss-nesting'),
    require('cssnano')
  ]
};
```

> [!TIP]
> This plugin uses [postcss-load-config](https://github.com/postcss/postcss-load-config) which will load PostCSS configuration from your project's `package.json` or from a litany of other files. We recommend creating a file named `postcss.config.js`.

### Options

eleventy-plugin-postcss supports the following options:

| Name              | Type(s)                   | Default                      |
|:------------------|:--------------------------|:-----------------------------|
| `templateFormats` | `Array<String>`, `String` | `['css', 'pcss', 'postcss']` |

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(require('@jgarber/eleventy-plugin-postcss'), {
    templateFormats: 'css'
  });
};
```

> [!NOTE]
> For most use cases, the default `templateFormats` value will suffice.

### Sass-style Partials Support

eleventy-plugin-postcss treats files named with a leading underscore (e.g. `_variables.css`) as [Sass-style partials](https://sass-lang.com/guide/#partials). These files **will not** be written to the output directory.

### ESM Support

Eleventy v3.0.0 [added bundler-free ESM support](https://www.11ty.dev/blog/canary-eleventy-v3/). This plugin works with either ESM or CommonJS projects!

```js
import postcssPlugin from '@jgarber/eleventy-plugin-postcss';

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(postcssPlugin);
}
```

## Acknowledgments

This plugin is derived from [whoisvadym/eleventy-plugin-postcss](https://github.com/whoisvadym/eleventy-plugin-postcss).

eleventy-plugin-postcss is written and maintained by [Jason Garber](https://sixtwothree.org).
