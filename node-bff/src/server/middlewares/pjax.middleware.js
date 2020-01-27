const cheerio = require('cheerio')
const {  Readable } = require('stream')

function writeHTML(ctx,html){
  ctx.res.write(html)
}

function endWrite(ctx){
  ctx.res.end(null);
}

function createSSRStream(ctx,html){
  // 通过 Promise 的方式 pipe
  return new Promise((resolve,reject) => {
    const rd = new Readable()
    rd.push(html)
    rd.push(null)
    rd.pipe(ctx.res)
  })
}

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
      // 修复 write 时 404 的错误
      ctx.status = 200;
      if(ctx.header['x-pjax']){
        const $ = cheerio.load(html)
        // 读取 CSS
        $('[data-load=pjax-css]').each(function(){
          // 这里的 this 是 DOM 元素
          const href = $(this).attr('href')
          const result = `<link data-load="pjax-css" type="text/css" rel="stylesheet" href="${href}"/>`
          // 使用 bigpipe
          // ctx.res.write(result)
          writeHTML(ctx,result)
        })

        // 读取普通的 DOM 元素
        $('[data-load=pjax]').each(function(){
          const result = $(this).html()
          // ctx.res.write(result)
          writeHTML(ctx,result)
        })

        // 读取 js
        // 已经加载过的 js 不再重复加载
        $('[data-load=pjax-js]').each(function(){
          // 通过 data-src 读取
          const url = $(this).attr('data-src')
          // const result = `<script src="${src}"></script>`
          // 通过 basket 懒加载 js
          const result = `<script>activeResource(${JSON.stringify({ url })})</script>`
          // ctx.res.write(result)
          writeHTML(ctx,result)
        })
        endWrite(ctx)
      }else{  
        // ctx.res.end()
        await createSSRStream(ctx,html)
      }
    }
  }
}

module.exports = PjaxMiddleware;