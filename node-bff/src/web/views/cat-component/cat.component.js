import banner from '~components/banner-component/banner.component'
banner.init()

export class Cat {
  init(){
    new Vue({
      el:'#app',
      methods:{
        getRandomPic(){
          window.location.reload()
        }
      }
    })
  }
}

new Cat().init()