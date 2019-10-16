import Vue from 'vue'
import Router from 'vue-router'

import homePage from './views/homePage/homePage.vue'
import searchPage from './views/searchPage/searchPage.vue'
import ordersPage from './views/ordersPage/ordersPage.vue'
import myPage from './views/myPage/myPage.vue'
import loginPage from './views/loginsys/loginPage.vue'
import registerPage from './views/loginsys/registerPage.vue'
import shopPage from './views/shopPage/shopPage.vue'
import order from './views/shopPage/order.vue'
import setting from '@/views/myPage/setting.vue'
import changePassWord from '@/views/myPage/changePasswd.vue'

import comments from './views/shopPage/comments'
import goodsList from './views/shopPage/goodsList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/home', component: homePage },
    { path: '/search', component: searchPage },
    { path: '/orders', name:'ordersPage', component: ordersPage,
      meta:{
        requireAuth:true
      }},
    { path: '/my', component: myPage,
      meta:{
        requireAuth:true
      }},
    { path:'/setting',component:setting,
      meta:{
        requireAuth:true
      }},
    { path: '/', redirect: '/home' },
    { path:'/login', component: loginPage},
    { path:'/register', component: registerPage},
    { path:'/shopPage/:id',component: shopPage,
      children:[
        { path:'comments',component: comments},
        { path:'goodsList',component: goodsList},
        { path:'',redirect:'goodsList'}

      ],
      meta:{
        requireAuth:true
      }
    },
    { 
      path:'/order', name:'order' ,component: order,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/changePasswd',component:changePassWord,
      meta:{
        requireAuth:true
      }
    }]
  
})
