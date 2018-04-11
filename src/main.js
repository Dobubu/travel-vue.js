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
import Vuex from 'vuex'

Vue.config.productionTip = false

// init
Vue.use(VueRouter);
Vue.use(VeeValidate);
fontawesome.library.add(solid);
Vue.use(Vuex);

Vue.component('font-awesome-icon', FontAwesomeIcon)

// app style
import './assets/all.css'

// page
import login from './components/appLogin.vue';
import content from './components/appContent.vue';
import zoneInfo from './components/pages/zoneInfo.vue';
import contentA from './components/pages/contentA.vue';
import contentB from './components/pages/contentB.vue';
import test from './components/test.vue';

const router = new VueRouter({
  // 使用 HTML 5 模式
  mode: 'history',
  //base: __dirname,
  // routre 表
  routes: [
    {
      // path: '/app-login',
      path: '/',
      name: 'appLogin',
      component: login
      // component: () => import('@/components/appLogin')
    },
    {
      // path: '/',
      path: '/appContent',
      name: 'appContent',
      component: content,
      // component: () => import('@/components/appContent'),
      children: [
          {
            path: '/appContent/contentA',
            name: 'contentA',
            component: contentA
            // component: () => import('@/components/pages/contentA')
          },
          {
            path: '/appContent/contentB',
            name: 'contentB',
            component: contentB
            // component: () => import('@/components/pages/contentB')
          },
          {
            path: '/appContent/zoneInfo',
            name: 'zoneInfo',
            component: zoneInfo
            // component: () => import('@/components/pages/zoneInfo')
          },
        ]
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    // // router 轉址
    // {
    //   path: '/*',
    //   redirect: '/appLogin'
    //   // redirect: '/appContent'
    // }
  ]
});


let store = new Vuex.Store({
  state: {
    loginName: '',
  },
  getters: {
    getLoginName (state) {
      return state.loginName
    },
  },
  mutations: {
    updateMessage (state, message) {
      state.loginName = message
    }
  },
  actions: {
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // router 掛載設定
  router,
  store,
  // app.vue 掛載並 replace index.html 原始掛載點： <div id="app"></div>
  render: h => h( App )
})
