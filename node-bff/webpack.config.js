const webpackMerge = require('webpack-merge')
const baseConfig = require('./config/web/config.base')
const envConfig = './config/web/config.' + process.env.NODE_ENV

module.exports = webpackMerge(baseConfig,require(envConfig))