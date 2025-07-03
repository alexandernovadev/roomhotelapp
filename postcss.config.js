/* eslint-disable import/no-extraneous-dependencies */
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssImport(),
    autoprefixer(),
  ],
};
