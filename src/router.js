import Vue from 'vue'
import Router from 'vue-router'

import homePage from './views/homePage/homePage.vue'
import searchPage from './views/searchPage/searchPage.vue'
import ordersPage from './views/ordersPage/ordersPage.vue'
import myPage from './views/myPage/myPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/home', component: homePage },
    { path: '/search', component: searchPage },
    { path: '/orders', component: ordersPage },
    { path: '/my', component: myPage },
    { path: '/', redirect: '/home' }
  ]
})
