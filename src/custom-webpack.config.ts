
// Add additional requirements here
const webpack = require("webpack");
// If you're using dotenv
const config = require("dotenv").config({path:'./env'});

// Export a configuration object
// See [Wepack's documentation](https://webpack.js.org/configuration/) for additional ideas of how to 
// customize your build beyond what Angular provides.
module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin(config.parsed)
]
}