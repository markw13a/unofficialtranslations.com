const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        './public/react-bundle':  './src/client',
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
                  presets: ['@babel/react', '@babel/env'] // Transpiles JSX and ES6
                }
              }]            
            }
           ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
    devtool: 'inline-source-map'
};


module.exports = config;