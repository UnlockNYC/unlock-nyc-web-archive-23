// configuration file

// add styles/css, scripts, etc. folders!
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });
  return {
    dir: {
      output: "build",
    },
  };
  //ackee?
  const ackeeTracker = require("ackee-tracker");
  const instance = ackeeTracker.create(
    "https://unlocknyc-analytics.netlify.app"
  );
  document.querySelector("#press-button").addEventListener("click", () => {
    // press inquiry
    instance.action("7b6362f5-d572-4c38-ae67-730be4f7bb20", {
      key: "Click",
      value: 1,
    });
  });
  document.querySelector("div.report-track").addEventListener("click", () => {
    // report discrimination, 2 buttons
    instance.action("fb71375b-ca06-4a1f-a65d-bf5650432ace", {
      key: "Click",
      value: 1,
    });
  });
  document.querySelector("button#call").addEventListener("click", () => {
    // take action, email button
    instance.action("ae6292d4-b1ae-4139-9e44-6dc1c6882054", {
      key: "Click",
      value: 1,
    });
  });
};
