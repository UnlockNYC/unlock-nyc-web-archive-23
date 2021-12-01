// configuration file

// add styles/css, scripts, etc. folders!
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strictFilters: false // renamed from `strict_filters` in Eleventy 1.0
  });
  return {
    dir: {
      output: "build"
    }
  }
};
