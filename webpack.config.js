const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

const config = {
    entry: {
        app:'./public/js/index.js'
    },
    output: {
        path: path.join(__dirname + "/dist"),
        filename: "bundle.js"
    },
    mode: 'development'
}

module.exports = config