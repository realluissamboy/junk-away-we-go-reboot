const { minify } = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });

  const cnamePath = require("fs").existsSync("src/CNAME") ? "src/CNAME" : null;
  if (cnamePath) {
    eleventyConfig.addPassthroughCopy("src/CNAME");
  }

  eleventyConfig.setTemplateFormats(["njk", "html", "md"]);
  eleventyConfig.addTemplateFormats("njk");

  eleventyConfig.addFilter("date", function (value, format) {
    const d = value instanceof Date ? value : new Date(value);
    if (format === "year") return d.getFullYear();
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  if (process.env.NODE_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", async function (content) {
      if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
        return await minify(content, {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        });
      }
      return content;
    });
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
