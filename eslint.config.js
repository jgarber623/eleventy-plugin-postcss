const ava = require('@jgarber/eslint-config/ava');
const config = require('@jgarber/eslint-config');

module.exports = [
  ...config,
  ...ava
];
