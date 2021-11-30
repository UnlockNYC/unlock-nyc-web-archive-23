// configuration file

const CleanCSS = require("clean-css");

// add styles/css, scripts, etc. folders!
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strictFilters: false // renamed from `strict_filters` in Eleventy 1.0
  });
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });
};