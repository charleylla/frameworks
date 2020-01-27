const injectJavaScriptMatch = '<!-- !inject-javascript -->';
const componentAliasMatch = '~components';

class AfterHtmlWebpackPlugin {
  constructor(options = {
    commonChunks:[]
  }){
    this.options = options;
    // 将数组转换成 map
    this.initCommonChunksMap()
  }
  initCommonChunksMap(){
    let index = 0,commonChunksMap = {},chunk = '';
    while(chunk = this.options.commonChunks[index++]){
      commonChunksMap[chunk] = chunk;
    }
    this.commonChunksMap = commonChunksMap;
  }
  apply(compiler){
    compiler.hooks.compilation.tap('AfterHtmlWebpackPlugin',compilation => {
      // 为 html-webpack-plugin 编写插件
      // 替换 js 脚本
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap('AfterHtmlWebpackPlugin',data => {
        const { html,assets:{ js,publicPath,chunks } } = data;
        let htmlAfterReplace = html;

        const jsList = js.map(script => script.replace(publicPath,''))
                                .map(script => {
                                  const absolutePath = script.split('assets').pop()
                                  const chunkName = absolutePath.split('/scripts').pop()
                                  const reg = /\/scripts\/(.*)\.(.*)\.js$/g
                                  if(reg.test(absolutePath)){
                                    const chunkName = RegExp.$1;
                                    // 白名单
                                    if(this.commonChunksMap[chunkName]){
                                      return `<script src="${absolutePath}"></script>`
                                    }
                                  }
                                  return `<script data-load="pjax-js" src="${absolutePath}"></script>`
                                })
                                .join('')

        htmlAfterReplace = html.replace(injectJavaScriptMatch,jsList)
                                              .replace(componentAliasMatch,'../../components')
        // 修改 html
        data.html = htmlAfterReplace;
        // 清空 js，不将脚本文件插入到 html 中
        // 仅使用自定义的替换方式即可
        // 或者 配置 html-webpack-plugin 时将 inject 设置为 false
        // data.assets.js = []
      })
    })
  }
}

module.exports = AfterHtmlWebpackPlugin;