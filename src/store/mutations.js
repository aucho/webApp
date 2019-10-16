const mutations = {
  login(state,userInfo){
    state.authorized = true
    state.userInfo = userInfo
    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    window.sessionStorage.setItem('authorized','true')
  },
  undoLogin(state){
    state.authorized = false
    state.userInfo = null
    window.sessionStorage.setItem('authorized','false')
    window.sessionStorage.removeItem('userInfo')
  }
}
export default mutations