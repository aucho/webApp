<template>
  <div id="navigation-bar">
    <router-link to="/home">
      <svg class="icon" aria-hidden="true">
        <use :href="iconHome"/>
      </svg>
      <span>首页</span>
    </router-link>

    <router-link to="/search">
      <svg class="icon" aria-hidden="true">
        <use :href="iconSearch" />
      </svg>
      <span>发现</span>
    </router-link>

    <router-link to="orders">
      <svg class="icon" aria-hidden="true">
        <use :href="iconOrders" />
      </svg>
      <span>订单</span>
    </router-link>

    <router-link to="my">
      <svg class="icon" aria-hidden="true">
        <use :href="iconMy" />
      </svg>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
      iconHome : (this.$route.path === '/home') ? '#icon-home-fill' : '#icon-home',
      iconSearch : (this.$route.path === '/search') ? '#icon-check-circle-fill' : '#icon-search',
      iconOrders : (this.$route.path === '/orders') ? '#icon-customerservice' : '#icon-shopping-fill',
      iconMy : '#icon-meh'
    }
  },
  watch:{
    $route(to, from){
      switch(to.path)
      {
        case '/home': this.iconHome = '#icon-home-fill';break;
        case '/search': this.iconSearch = '#icon-check-circle-fill';break;
        case '/orders': this.iconOrders = '#icon-customerservice';break;
      }
      switch(from.path)
      {
        case '/home': this.iconHome = '#icon-home';break;
        case '/search': this.iconSearch = '#icon-search';break;
        case '/orders': this.iconOrders = '#icon-shopping-fill';break;
      }

    }
  }
};
</script>

<style lang="stylus" scoped>
#navigation-bar 
  font-size: 12px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 8%;
  display: flex;
  box-shadow: 0 0 0.2em #999;
  text-align: center;
  align-items: center;

  a 
    flex: 2.5;
    height: 80%;
    text-decoration none
    color #888

  .router-link-active
    color #26a2ff

  span 
    display block
    width: 100%
</style>
