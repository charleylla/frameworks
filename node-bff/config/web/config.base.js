const path = require('path');
const glob = require('glob');
const HtmlWebpackPlgin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const AfterHtmlWebpackPlugin = require('./AfterHtmlWebpackPlugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootPath = path.resolve(__dirname,'../../')
const webSrcPath = path.resolve(__dirname, '../../src/web');
const webPath = path.resolve(__dirname, '../../src/web/views');
const distPath = path.resolve(__dirname, '../../static');

// 匹配 views 
const files = glob.sync(webPath + '/**/*.component.js')
function resolveFiles(files) {
  const entry = {}, htmlPlugins = [], copyPlugins = [];
  let index = 0, file = '';
  while (file = files[index]) {
    const file = files[index];
    const templateFile = file.replace(/\.js/, '.html');
    const styleFile = file.replace(/\.js/, '.css');
    const reg = /\/(\w+\.component)\.js$/g;

    if (reg.test(file)) {
      // **.component.js
      const entryName = RegExp.$1;
      // views/xx/xx-component/xx.component.html
      const htmlFilename = templateFile
        .replace(rootPath + '/src/web', '')
        .replace(/^\//g, '')

      // 配置 entry
      entry[entryName] = file;
      // 配置 html-webpack-plugin
      htmlPlugins.push(new HtmlWebpackPlgin({
        template: templateFile,
        filename: htmlFilename,
        inject:false,
        chunks: ['webpack-runtime', entryName]
      }))
    }
    index++;
  }
  return {
    entry,
    htmlPlugins
  }
}

const { entry, htmlPlugins } = resolveFiles(files);

module.exports = {
  entry,
  output: {
    path: distPath,
    // 脚本统一打包到 scripts 中
    filename: 'assets/scripts/[name].[contentHash:5].js'
  },
  optimization: {
    runtimeChunk: {
      name: "webpack-runtime"
    }
  },
  // 简化控制台输出
  stats: {
    assets: false,
    builtAt:false,
    cached:false,
    cachedAssets:false,
    children:false,
    chunks:false,
    chunkModules:false,
    chunkGroups:false,
    // entrypoints:false,
    modules:false,
  },
  resolve:{
    alias:{
      '~':webSrcPath,
      '~components':webSrcPath + '/components',
    }
  },
  plugins: [
    ...htmlPlugins,
    new AfterHtmlWebpackPlugin({
      commonChunks:['webpack-runtime']
    }),
    // new CleanWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "Webpack 项目构建",
      suppressSuccess: true
    }), 
    // 配置 copy-webpack-plugin
    new CopyWebpackPlugin([
      {
        from: webSrcPath + '/assets/scripts',
        to: distPath + '/assets/scripts'
      },
      {
        from: webSrcPath + '/components',
        to: distPath + '/components'
      },
      {
        from: webPath + '/**/*.component.css',
        to: distPath + '/assets/styles/[name].[ext]'
      },
      {
        from: webSrcPath + '/assets/styles',
        to: distPath + '/assets/styles'
      },
      {
        from: webPath + '/layout',
        to: distPath + '/views/layout'
      },
    ],{
      // 文件未发生变化时不 copy
      copyUnmodified:false
    })
  ]
}