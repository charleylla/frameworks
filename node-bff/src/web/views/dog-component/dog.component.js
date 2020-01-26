export class Dog {
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

new Dog().init()