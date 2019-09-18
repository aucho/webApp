//entry
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//初始化css样式
import './assets/css/reset.css'
import './assets/stylus/minxins.styl'
//组件库mint-ui
import {Swipe, SwipeItem} from 'mint-ui'
import "mint-ui/lib/style.css"
// import fastclick from 'fastclick'
// fastclick.attach(document.body);
// //解决点击延迟300ms
// //解决延迟 https://blog.csdn.net/qappleh/article/details/80419204

Vue.config.productionTip = false
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
new Vue({
  //el:'#app',
  router,
  render: h => h(App)
}).$mount('#app')
