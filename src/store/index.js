import Vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
Vue.use(vuex)

const store = new vuex.Store({
  state:{
    authorized:window.sessionStorage.getItem('authorized') || false,
    userInfo:JSON.parse(window.sessionStorage.getItem('userInfo')) || null
    // {
    //   id:'',
    //   usrName:'',
    //   address:'',
    //   mailAddress:'',
    //   // something else
    // }
  },
  mutations,
  // actions:{

  // },
  // getters:{
    
  // },
  // modules:{

  // }
})

export default store