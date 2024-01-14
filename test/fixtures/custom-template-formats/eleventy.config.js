module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(require('../../../'), {
    templateFormats: '11ty'
  });
};
