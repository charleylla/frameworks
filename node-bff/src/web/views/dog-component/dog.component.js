export class Dog {
  init(){
    console.warn('==准备更换新的狗狗==')
    document.querySelector('#btn-dog').addEventListener('click',() => {
      window.location.reload();
    })
  }
}

new Dog().init()