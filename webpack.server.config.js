const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        './build/server-bundle':  './bin/www.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname
    },
    target: 'node',
    module: {
        rules: [
            {
             test: [/\.js$/, /\.jsx$/],
              use: [{
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  plugins: ['@babel/plugin-transform-modules-commonjs'],
                  presets: ['@babel/env'] // Transpiles JSX and ES6
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