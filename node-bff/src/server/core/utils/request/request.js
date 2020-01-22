const axios = require('axios').default
const logger = require('../logger')

class NodeFetch {
  constructor(options = {}){
    this.options = options;
    this.init()
  }
  init(){
    this.instance = axios.create(this.options);
  }

  async get(options = { url:'/',params:{}}){
    const { url,params } = options;
    try{
      const res = await this.instance.get(url,{ params })
      return res;
    }catch(e){
      logger.errorLogger.error(e)
      return {
        code:-1,
        status:false,
        message:'服务器开小差了'
      }
    }
  }
}

module.exports = NodeFetch;
