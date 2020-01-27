import banner from '~components/banner-component/banner.component'
banner.init()

export class Cat {
  init(){
    console.warn('==准备更换新的喵喵==')
    document.querySelector('#btn-dog').addEventListener('click',() => {
      window.location.reload();
    })
  }
}

new Cat().init()