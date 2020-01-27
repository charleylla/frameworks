const DogModel = require('~models/dog.model');

class DogController {
  constructor() {
    this.model = new DogModel()
  }
  async actionIndex(ctx) {
    const data = await this.model.getDogData()
    const html = await ctx .render('dog-component/dog.component.html',{ data })
    ctx.body = html;
  }
}

module.exports = DogController;