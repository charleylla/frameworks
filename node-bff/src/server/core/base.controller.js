const { baseHTTP } = require('./utils/request')

class BaseController {
  constructor(){
    this.baseHTTP = baseHTTP;
  }
}

module.exports = BaseController;