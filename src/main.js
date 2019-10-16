//entry
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import filter from './filter'
// axios
import axios from 'axios'
import vueAxios from 'vue-axios'
//初始化css样式
import './assets/css/reset.css'
import './assets/stylus/minxins.styl'
//组件库mint-ui
import {Swipe, SwipeItem, Spinner,Search} from 'mint-ui'
import "mint-ui/lib/style.css"

Vue.use(vueAxios,axios,Spinner)

Vue.config.productionTip = false
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Spinner.name, Spinner)
Vue.component(Search.name, Search)
Vue.filter('timeFormat', filter.timeFormat)
new Vue({
  //el:'#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
