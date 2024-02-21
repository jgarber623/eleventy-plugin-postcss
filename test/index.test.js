const assert = require("node:assert");
const test = require("node:test");

const sinon = require("sinon");

const Eleventy = require("@11ty/eleventy");

test.beforeEach(() => {
  console.log = sinon.spy();
});

test.afterEach(() => {
  sinon.reset();
});

test("default plugin configuration", async () => {
  const eleventy = new Eleventy("test/fixtures/default", null, { configPath: "index.js" });
  const results = await eleventy.toJSON();

  assert.equal(results[0].content, `html {\n  font-family: serif;\n}\n\na {\n  color: #c00;\n}\n`);

  assert.ok(console.log.calledOnce);
});

test("custom templateFormats option", async () => {
  const eleventy = new Eleventy("test/fixtures/custom-template-formats", null, {
    configPath: "test/fixtures/custom-template-formats/eleventy.config.js",
  });

  const results = await eleventy.toJSON();

  assert.equal(results[0].content, `html {\n  font-family: sans-serif;\n}\n\na {\n  color: rebeccapurple;\n}\n`);

  assert.ok(console.log.calledOnce);
});

test("Sass-style partials", async () => {
  const eleventy = new Eleventy("test/fixtures/partials", null, { configPath: "index.js" });
  const results = await eleventy.toJSON();

  const actual = results.sort((a, b) => {
    if (a.inputPath < b.inputPath) return -1;
    if (a.inputPath > b.inputPath) return 1;
    return 0;
  });

  const expected = [
    {
      content: "/* Doesn't matter what's in this file, it shouldn't be written to output. */\n",
      inputPath: "./test/fixtures/partials/_partial.css",
      outputPath: false,
      url: false,
    },
    {
      content: `html {\n  padding: 1rem;\n}\n\np {\n  font-family: cursive;\n}\n`,
      inputPath: "./test/fixtures/partials/styles.css",
      outputPath: "_site/styles.css",
      url: "/styles.css",
    },
  ];

  assert.deepStrictEqual(actual, expected);

  assert.ok(console.log.calledOnce);
});
