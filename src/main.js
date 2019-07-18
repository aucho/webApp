//entry
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import fastclick from 'fastclick'
fastclick.attach(document.body);
//解决点击延迟300ms
//解决延迟 https://blog.csdn.net/qappleh/article/details/80419204

Vue.config.productionTip = false

new Vue({
  //el:'#app',
  router,
  render: h => h(App)
}).$mount('#app')
