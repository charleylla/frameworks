const { baseHTTP } = require('./utils/request')

class BaseModel {
  constructor(){
    this.baseHTTP = baseHTTP;
  }
}

module.exports = BaseModel;