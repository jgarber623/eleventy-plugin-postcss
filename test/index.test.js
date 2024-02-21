const assert = require("node:assert");
const { mock, test } = require("node:test");

const Eleventy = require("@11ty/eleventy");

test.beforeEach(() => {
  console.log = mock.fn();
});

test.afterEach(() => {
  mock.reset();
});

test("default plugin configuration", async () => {
  const eleventy = new Eleventy("test/fixtures/default", null, { configPath: "index.js" });
  const results = await eleventy.toJSON();

  const expected = `html {\n  font-family: serif;\n}\n\na {\n  color: #c00;\n}\n`;

  assert.strictEqual(results[0].content, expected);
  assert.strictEqual(console.log.mock.callCount(), 1);
});

test("custom templateFormats option", async () => {
  const eleventy = new Eleventy("test/fixtures/custom-template-formats", null, {
    configPath: "test/fixtures/custom-template-formats/eleventy.config.js",
  });

  const results = await eleventy.toJSON();

  const expected = `html {\n  font-family: sans-serif;\n}\n\na {\n  color: rebeccapurple;\n}\n`;

  assert.strictEqual(results[0].content, expected);
  assert.strictEqual(console.log.mock.callCount(), 1);
});

test("Sass-style partials", async () => {
  const eleventy = new Eleventy("test/fixtures/partials", null, { configPath: "index.js" });
  const results = await eleventy.toJSON();

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

  assert.deepStrictEqual(results, expected);
  assert.strictEqual(console.log.mock.callCount(), 1);
});
