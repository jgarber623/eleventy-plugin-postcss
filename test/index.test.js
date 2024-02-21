const sinon = require("sinon");
const test = require("ava");

const Eleventy = require("@11ty/eleventy");

test.beforeEach(() => {
  console.log = sinon.spy();
});

test.afterEach(() => {
  sinon.reset();
});

test("default plugin configuration", async (t) => {
  const eleventy = new Eleventy("test/fixtures/default", null, { configPath: "index.js" });
  const results = await eleventy.toJSON();

  t.is(results[0].content, `html {\n  font-family: serif;\n}\n\na {\n  color: #c00;\n}\n`);

  t.true(console.log.calledOnce);
});

test("custom templateFormats option", async (t) => {
  const eleventy = new Eleventy("test/fixtures/custom-template-formats", null, {
    configPath: "test/fixtures/custom-template-formats/eleventy.config.js",
  });

  const results = await eleventy.toJSON();

  t.is(results[0].content, `html {\n  font-family: sans-serif;\n}\n\na {\n  color: rebeccapurple;\n}\n`);

  t.true(console.log.calledOnce);
});

test("Sass-style partials", async (t) => {
  const eleventy = new Eleventy("test/fixtures/partials", null, { configPath: "index.js" });
  const results = await eleventy.toJSON();

  const expected = [
    {
      content: "/* Doesn't matter what's in this file, it shouldn't be written to output. */\n",
      outputPath: false,
      url: false,
    },
    {
      content: `html {\n  padding: 1rem;\n}\n\np {\n  font-family: cursive;\n}\n`,
      outputPath: "_site/styles.css",
      url: "/styles.css",
    },
  ];

  t.like(results.sort((a, b) => {
    if (a.inputPath < b.inputPath) return -1;
    if (a.inputPath > b.inputPath) return 1;
    return 0;
  }), expected);

  t.true(console.log.calledOnce);
});
