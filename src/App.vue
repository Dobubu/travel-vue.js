<template>
  <div id="app" class="wrap">
    <router-view></router-view>
    <!-- <testView :test='father'></testView> -->
  </div>
</template>

<script>
// import testView from './components/test'

export default {
  name: 'App',
  data: function(){
    return {
      getAjaxData: [],
      flag: false
    }
  },
  components: {
    // testView,
  },
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
