// configuration file

module.exports = function (eleventyConfig) {
  // pass through: treat specific files/directories as static, not templates or HTML
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("start/secure/advocate/report/schema.json");
  
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });
  return {
    dir: {
      output: "build",
    },
  };
};
