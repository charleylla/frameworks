module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    // 包含当前项目
    include:['models','controllers'],
    includePattern: /\.js|ts$/
  },
  opts:{
    // 指定文档输出的目录
    destination:'./docs/server'
  },
  plugins: [],
  templates: {
    cleverLinks: false,
    monospaceLinks: false
  }
}