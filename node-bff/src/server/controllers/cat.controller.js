const CatModel = require('~models/cat.model');

class CatController {
  constructor() {
    this.model = new CatModel()
  }
  async actionIndex(ctx) {
    const data = await this.model.getCatData()
    // 渲染模板
    // 渲染出的结果赋值给 ctx.body
    // Node 和 JS 的各种模板都可以配合，如 vue、jsx、tsx ···
    // Node 很适合做渲染
    await ctx.render('cat-component/cat.component.html',{ data })
  }
}

module.exports = CatController;