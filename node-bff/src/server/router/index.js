const router = require('koa-simple-router')

// 引入 controller
const DogController = require('~server/controllers/dog.controller')
const dogController = new DogController();

class AppRoute {
  constructor(app){
    this.app  = app
  }
  // 初始化路由
  init(){
    this.app.use(router(_ => {
      _.get('/',dogController.actionIndex.bind(dogController));
    }))
    return this;
  }
}

module.exports  = AppRoute;