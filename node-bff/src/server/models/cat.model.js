const BaseModel = require('~server/core/base.model')

/**
 * @fileoverview Cat 的数据模型
 * @author Charley
 */

/**
 * @description Cat 的数据模型
 * @class
 */
class CatModel extends BaseModel{
  constructor(){
    super()
  }
   /**
    * @method
    * @description 获取初始化数据
    */
  async getCatData(){
    const res = await this.baseHTTP.catFetch.get('/')
    const { data } = res;
    // 计算图片大小
    data.fileSizeBytesDesc = '未知大小';
    data.imgUrl = data.file;
    return data;
  }
}

module.exports = CatModel;