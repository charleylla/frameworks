const DogModel = require('~models/dog.model');

class DogController {
  constructor() {
    this.model = new DogModel()
  }
  async actionIndex(ctx) {
    const data = await this.model.getDogData()
    await ctx .render('dog-component/dog.component.html',{ data })
  }
}

module.exports = DogController;