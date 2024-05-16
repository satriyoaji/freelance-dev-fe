// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Other webpack configuration...
  plugins: [
    new Dotenv()
  ]
};
