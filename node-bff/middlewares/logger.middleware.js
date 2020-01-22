
const logger = require('~/core/utils/logger')

class LoggerMiddleware{
  constructor(app){
    this.app = app;
  }
  init(){
    this.app.context.logger = logger;
    this.app.logger = logger;
  }
}

module.exports = LoggerMiddleware