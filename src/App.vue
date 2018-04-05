<template>
  <div id="app" class="wrap">
    <!-- <router-link :to="{path: '/loginSuccess'}">loginSuccess</router-link> -->
    <!-- <router-link :to="{name: 'loginError'}">loginError</router-link> -->

    <!-- <img src="./assets/logo.png"> -->
    <appContent :msg='getAjaxData' v-if="flag"/>

    <!-- <router-view></router-view> -->
    
    <appFooter/>
  </div>
</template>

<script>
import appContent from './components/appContent'
import appFooter from './components/appFooter'
import HelloWorld from './components/HelloWorld'

import axios from 'axios'

export default {
  name: 'App',
  components: {
    HelloWorld,
    appContent,
    appFooter,
  },
  data: function(){
    return {
      getAjaxData: [],
      flag: false
    }
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData: function(){
      let self = this;
      axios.get('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97')
        .then(function (response) {
          console.log('success appVue');
          self.getAjaxData = response.data.result.records;
          console.log(self.getAjaxData);
          self.flag = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
