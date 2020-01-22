class ErrorMiddleware {
  constructor(app) {
    this.app = app;
  }
  init() {
    this.initResponseError()
    this.initAppError()
  }
  initResponseError() {
    this.app.use(async (ctx, next) => {
      // 利用洋葱模型完成异常处理
      try {
        await next()
        // 洋葱模型 
        if (404 !== ctx.status) return;
        // 打印 warn 日志
        ctx.logger.warnLogger.warn({
          path: ctx.path,
          query: JSON.stringify(ctx.query)
        })

        // 捕获 404
        ctx.status = 404;
        ctx.body = `<script 
          type="text/javascript" 
          src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" 
          charset="utf-8"
          homePageUrl="/" 
          homePageName="回到主页"></script>`
      } catch (e) {
        // 捕获其他错误
        ctx.status = 500;
        // 错误日志 
        ctx.logger.errorLogger.error(e)
      }
    })
  }
  initAppError() {
    // 处理 app 的 error  事件
    this.app.on('error', (e) => {
      this.app.logger.errorLogger.error(e)
    })
  }
}


module.exports = ErrorMiddleware;