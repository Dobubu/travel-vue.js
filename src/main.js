// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
// import routers  from './routers'

Vue.config.productionTip = false

// init
Vue.use(VueRouter);
Vue.use(VeeValidate);
fontawesome.library.add(solid);

Vue.component('font-awesome-icon', FontAwesomeIcon)

// app style
import './assets/all.css'

// page
import login from './components/appLogin.vue';
import content from './components/appContent.vue';
// import loginSuccess from './components/pages/loginSuccess.vue';
// import loginError from './components/pages/loginError.vue';

const router = new VueRouter({
  // 使用 HTML 5 模式
  mode: 'history',
  base: __dirname,
  // routre 表
  routes: [
    {
      path: '/appLogin',  
      name: 'appLogin',   
      component: login // 上面import名稱
    },
    {
      path: '/appContent',  
      name: 'appContent',   
      component: content // 上面import名稱
    },
    // router 轉址
    { 
      path: '/*', 
      redirect: '/appLogin'
      // redirect: '/appContent' 
    }
  ]
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // router 掛載設定
  router,
  // app.vue 掛載並 replace index.html 原始掛載點： <div id="app"></div>
  render: h => h( App )
})


