'use strict';

var webpack = require('webpack'),
    pkg = require('./package.json'),
    config = require('./webpack.config.dev.js'),
    uglifyOptions = {
        compress: {
            warnings: false
        },
        comments: false
    };

config.devtool = 'source-map';
config.watch = null;
config.watchOptions = null;

config.plugins = [
    new webpack.DefinePlugin({ _DEV_: false }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(uglifyOptions),
    new webpack.BannerPlugin(pkg.name + ' - ' + new Date())
];

module.exports = config;
