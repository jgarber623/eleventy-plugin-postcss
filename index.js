const path = require("node:path");

const postcss = require("postcss");
const postcssrc = require("postcss-load-config");

const package_ = require("./package.json");

module.exports = function(eleventyConfig, options = {}) {
  try {
    eleventyConfig.versionCheck(package_["11ty"].compatibility);
  } catch (error) {
    console.log(`WARN: Eleventy Plugin (${package_.name}) Compatibility: ${error.message}`);
  }

  let postcssConfig = {
    options: {},
    plugins: [],
  };

  options = Object.assign({
    templateFormats: ["css", "pcss", "postcss"],
  }, options);

  eleventyConfig.addTemplateFormats(options.templateFormats);

  eleventyConfig.addExtension(options.templateFormats, {
    outputFileExtension: "css",

    init: async () => {
      try {
        postcssConfig = await postcssrc();
      } catch (error) {
        console.log(`WARN: Eleventy Plugin (${package_.name}): ${error.message}`);
      }
    },

    getData: async () => {
      return {
        layout: false,
      };
    },

    compileOptions: {
      permalink: (inputContent, inputPath) => {
        if (path.parse(inputPath).name.startsWith("_")) {
          return false;
        }
      },
    },

    compile: async (inputContent, inputPath) => {
      return async ({ page }) => {
        const { options, plugins } = postcssConfig;

        return await postcss(plugins)
          .process(inputContent, { ...options, from: inputPath, to: page.outputPath })
          .then(result => result.css);
      };
    },
  });
};
