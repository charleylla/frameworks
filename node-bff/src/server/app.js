require('module-alias/register')
const Koa = require('koa')
const co = require('co');
const render = require('koa-swig');
const serve = require('koa-static');
const config = require('~config/server');
const { ErrorMiddleware,LoggerMiddleware,PjaxMiddleware } = require('./middlewares')

const app = new Koa()
const AppRoute = require('./router')

// 注册模板
app.context.render = co.wrap(render({
  root: config.get('viewsDir'),
  autoescape: true,
  cache: config.get('swig').cache, // disable, set to false
  ext: 'html',
  writeBody: false,
  varControls:config.get('swig').varControls
}));
// 初始化静态文件
app.use(serve(config.get('staticDir')))

// Pjax
new PjaxMiddleware(app).init();
// 日志功能
new LoggerMiddleware(app).init();
// 容错处理
new ErrorMiddleware(app).init();
// 初始化路由
new AppRoute(app).init();

app.listen(config.get('port'),() => {
  console.log('Server is running...')
})