<template>
  <div id="app" class="wrap">
    <router-view></router-view>

    <div>總共:${{totalPrice2}}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function(){
    return {
      getAjaxData: [],
      flag: false
    }
  },
  computed: {
    totalPrice2 () {
      return this.$store.getters.getTotal
    }
  }
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
