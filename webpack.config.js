const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        './build/bundle':  './src/client'
    },
    output: {
        filename: '[name].js',
        path: __dirname
    },
    module: {
        rules: [
            {
             test: [/\.js$/, /\.jsx$/],
              use: [{
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  presets: ['react', 'env'] // Transpiles JSX and ES6
                }
              }]            
            }
           ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      }
};


module.exports = config;