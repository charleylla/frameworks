const injectJavaScriptMatch = '<!-- !inject-javascript -->';
const componentAliasMatch = '~components';

class AfterHtmlWebpackPlugin {
  apply(compiler){
    compiler.hooks.compilation.tap('AfterHtmlWebpackPlugin',compilation => {
      // 为 html-webpack-plugin 编写插件
      // 替换 js 脚本
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap('AfterHtmlWebpackPlugin',data => {
        const { html,assets:{ js,publicPath } } = data;
        let htmlAfterReplace = html;

        const jsList = js.map(script => script.replace(publicPath,'')).map(script => {
          const absolutePath = script.split('assets').pop()
          return `<script src="${absolutePath}"></script>`
        }).join('')

        htmlAfterReplace = html.replace(injectJavaScriptMatch,jsList)
                                              .replace(componentAliasMatch,'../../components')
        // 修改 html
        data.html = htmlAfterReplace;
        // 清空 js，不将脚本文件插入到 html 中
        // 仅使用自定义的替换方式即可
        data.assets.js = []
      })
    })
  }
}

module.exports = AfterHtmlWebpackPlugin;