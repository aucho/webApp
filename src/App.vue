<template>
  <div id="app">
    <router-view/>
    <navigation v-if="navAppear"/>
  </div>
</template>

<script>
import navigation from './components/bottomNavigationBar/bottomNavigationBar.vue'

export default {
  data() {
    return {
      navAppear: true,
      navAppearPath:[
        '/home',
        '/search',
        '/orders',
        '/my'
      ]
    }
  },
  created() {
    this.navAppear = false
    for (const path of this.navAppearPath){
      if (this.$route.path === path)
        this.navAppear = true
    }
  },
  components: {
    navigation,
  },
  watch: {
    $route(to){
      this.navAppear = false
      this.navAppearPath.forEach( n => {
        if (n === to.path)
           this.navAppear = true
      })
      if (to.meta.requireAuth &&(!this.$store.state.authorized || !this.$store.state.userInfo))
        this.$router.push({
          path:'/login'
        })
    }
  },
}
</script>

<style lang="stylus">
@import './assets/stylus/minxins.styl';

</style>

<style type="text/css">
.icon {
    width: 1.75rem; height: 1.75rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>