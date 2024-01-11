import fs from 'node:fs/promises';
import path from 'node:path';

import postcss from 'postcss';
import postcssrc from 'postcss-load-config';

const package_ = JSON.parse(await fs.readFile('./package.json'));

export default function(eleventyConfig, options = {}) {
  try {
    eleventyConfig.versionCheck(package_['11ty'].compatibility);
  } catch (error) {
    console.log(`WARN: Eleventy Plugin (${package_.name}) Compatibility: ${error.message}`);
  }

  let postcssConfig = {
    options: {},
    plugins: []
  };

  options = Object.assign({
    templateFormats: ['css', 'pcss', 'postcss'],
    ...options
  });

  eleventyConfig.addTemplateFormats(options.templateFormats);

  eleventyConfig.addExtension(options.templateFormats, {
    outputFileExtension: 'css',

    init: async () => {
      try {
        postcssConfig = await postcssrc();
      } catch (error) {
        console.log(`WARN: Eleventy Plugin (${package_.name}): ${error.message}`);
      }
    },

    compileOptions: {
      permalink: (inputContent, inputPath) => {
        if (path.parse(inputPath).name.startsWith('_')) {
          return false;
        }
      }
    },

    compile: async (inputContent, inputPath) => {
      return async ({ page }) => {
        const { options, plugins } = postcssConfig;

        return await postcss(plugins)
          .process(inputContent, { ...options, from: inputPath, to: page.outputPath })
          .then(result => result.css);
      };
    }
  });
}
