/* eslint-disable import/no-extraneous-dependencies */
const postcssImport = require('postcss-import');
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss(),
    autoprefixer(),
  ],
};
