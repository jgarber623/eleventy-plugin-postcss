import path from 'node:path';
import { readFile } from 'node:fs/promises';

import postcss from 'postcss';
import postcssrc from 'postcss-load-config';

const package_ = JSON.parse(await readFile(new URL('package.json', import.meta.url)));

export default function(eleventyConfig, options = {}) {
  try {
    eleventyConfig.versionCheck(package_['11ty'].compatibility);
  } catch (error) {
    console.log(`WARN: Eleventy Plugin (${package_.name}) Compatibility: ${error.message}`);
  }

  options = Object.assign({
    postcssConfig: {},
    templateFormats: ['css', 'pcss', 'postcss']
  }, options);

  for (const templateFormat of options.templateFormats) {
    eleventyConfig.addTemplateFormats(templateFormat);
  }

  eleventyConfig.addExtension(options.templateFormats, {
    outputFileExtension: 'css',

    init: async () => {
      try {
        options.postcssConfig = await postcssrc(options.postcssConfig);
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
        const { postcssConfig } = options;

        return await postcss(postcssConfig.plugins)
          .process(inputContent, { ...postcssConfig.options, from: inputPath, to: page.outputPath })
          .then(result => result.css);
      };
    }
  });
}
