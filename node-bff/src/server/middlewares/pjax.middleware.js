const cheerio = require('cheerio')

class PjaxMiddleware {
  constructor(app){
    this.app = app;
    this.app.context.oldRenderFn = this.app.context.render;
  }
  init(){
    this.app.context.render = async function(...args){
      // 通过 ctx.render 调用 render 方法
      // this 就是当前的 ctx 对象
      const ctx = this;
      // 渲染模板
      // 渲染出的结果赋值给 ctx.body
      // Node 和 JS 的各种模板都可以配合，如 vue、jsx、tsx ···
      // Node 很适合做渲染
      // 参数透传
      const html = await ctx.oldRenderFn(...args)
      if(ctx.header['x-pjax']){
        const $ = cheerio.load(html)
        let result = ''
        // 读取 CSS
        $('[data-load=pjax-css]').each(function(){
          // 这里的 this 是 DOM 元素
          const href = $(this).attr('href')
          result += `<link data-load="pjax-css" type="text/css" rel="stylesheet" href="${href}"/>`
        })

        // 读取普通的 DOM 元素
        $('[data-load=pjax]').each(function(){
          result += $(this).html()
        })

        // 读取 js
        // 已经加载过的 js 不再重复加载
        $('[data-load=pjax-js]').each(function(){
          const src = $(this).attr('src')
          result += `<script src="${src}"></script>`
        })
        return result;
      }else{  
        return html;
      }
    }
  }
}

module.exports = PjaxMiddleware;