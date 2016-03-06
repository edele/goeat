'use strict'

var webpack = require('webpack')
var path = require('path')

module.exports = {
    devtool: 'cheap-inline-module-source-map',

    entry: './resources/assets/scripts/app.js',

    output: {
        path: './public/js',
        filename: 'bundle.min.js'
    },

    resolve: {
        root: path.resolve(__dirname, 'resources/assets/scripts')
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 300
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|utilities)/,
                loader: 'eslint-loader'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    },

    eslint: {
        configFile: './.eslintrc'
    },

    plugins: [
        new webpack.DefinePlugin({ _DEV_: true })
    ]
}
