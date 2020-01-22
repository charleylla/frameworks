const BaseModel = require('~/core/base.model')

/**
 * @fileoverview Home 的数据模型
 * @author Charley
 */

/**
 * @description Home 的数据模型
 * @class
 */
class HomeModel extends BaseModel{
  constructor(){
    super()
  }
   /**
    * @method
    * @description 获取初始化数据
    */
  async getHomeData(){
    const res = await this.baseHTTP.get('/')
    const { data } = res;
    // 计算图片大小
    data.fileSizeBytesDesc = Math.round(data.fileSizeBytes / 1024) + 'KB'
    return data;
  }
}

module.exports = HomeModel;