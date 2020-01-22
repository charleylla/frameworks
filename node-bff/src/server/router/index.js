const router = require('koa-simple-router')

// 引入 controller
const HomeController = require('~server/controllers/home.controller')
const homeController = new HomeController();

class AppRoute {
  constructor(app){
    this.app  = app
  }
  // 初始化路由
  init(){
    this.app.use(router(_ => {
      _.get('/',homeController.actionIndex.bind(homeController));
    }))
    return this;
  }
}

module.exports  = AppRoute;