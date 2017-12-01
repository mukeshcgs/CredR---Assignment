 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    proxy: {
      '/api': {
        target: 'http://localhost:8082', 
        secure: false
      }
    },
    inline: true,
    port: 3000,
    historyApiFallback: true,
  },
 });