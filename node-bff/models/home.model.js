/**
 * @fileoverview Home 的数据模型
 * @author Charley
 */

/**
 * @description Home 的数据模型
 * @class
 */
class HomeModel {

   /**
    * @method
    * @description 获取初始化数据
    */
  async getHomeData(){
    const data = { msg:'Hello World' }
    return new Promise(res => {
      setTimeout(() => {
        res(data)
      },2000)
    })
  }
}

module.exports = HomeModel;