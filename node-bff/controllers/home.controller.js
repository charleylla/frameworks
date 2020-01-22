const HomeModel = require('~models/home.model');

class HomeController {
  constructor() {
    this.model = new HomeModel()
  }
  async actionIndex(ctx) {
    const data = await this.model.getHomeData()
    // 渲染模板
    // 渲染出的结果赋值给 ctx.body
    // Node 和 JS 的各种模板都可以配合，如 vue、jsx、tsx ···
    // Node 很适合做渲染
    ctx.body = await ctx.render('home/index',{ data })
  }
}

module.exports = HomeController;