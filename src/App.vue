<template>
  <div id="app">
    <router-view/>
    <navigation/>
  </div>
</template>

<script>
import navigation from './components/bottomNavigationBar/bottomNavigationBar.vue'

export default {
  components: {
    navigation,
  }
}
</script>

<style lang="stylus">
.app
  width 100%
  height 100%
  background #e5e5e5

</style>

<style type="text/css">
.icon {
    width: 2.5em; height: 2.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>