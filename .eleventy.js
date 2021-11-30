// configuration file

// add styles/css, scripts, etc. folders!
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('styles');
  eleventyConfig.addPassthroughCopy('scripts');
}

