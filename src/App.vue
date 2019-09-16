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