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
import login from './components/login.vue';
import account from './components/account.vue';
import content from './components/content.vue';
import zoneInfo from './components/pages/content-zoneInfo.vue';
import contentA from './components/pages/contentA.vue';
import contentB from './components/pages/contentB.vue';

const router = new VueRouter({
  // 使用 HTML 5 模式
  // mode: 'history',
  // base: __dirname,
  // routre 表
  routes: [
    {
      path: '/login',
      // path: '/',
      name: 'login',
      component: login,
      // component: () => import('@/components/appLogin')
    },
    {
      path: '/account',
      name: 'account',
      component: account,
      // component: () => import('./components/account')
    },
    {
      path: '/',
      // path: '/content',
      name: 'content',
      component: content,
      // component: () => import('@/components/appContent'),
      children: [
          {
            path: '/content/contentA',
            name: 'contentA',
            component: contentA
            // component: () => import('@/components/pages/contentA')
          },
          {
            path: '/content/contentB',
            name: 'contentB',
            component: contentB
            // component: () => import('@/components/pages/contentB')
          },
          {
            path: '/content/zoneInfo/:zoneId/:pageId',
            name: 'zoneInfo',
            component: zoneInfo
            // component: () => import('@/components/pages/zoneInfo')
          },
        ]
    },
    // router 轉址
    // {
    //   path: '/*',
    //   redirect: '/appContent'
    // }
  ]
});


let store = new Vuex.Store({
  state: {
    loginName: '',
  },
  getters: {
    getLoginName (state) {
      if(state.loginName !== ''){
        return state.loginName + '，您好'
      }
    },
  },
  mutations: {
    updateMessage (state, message) {
      state.loginName = message
    }
  },
  actions: {
    updateMessage (context, msgName) {
      context.commit('updateMessage',msgName)
    }
  }
})


/* eslint-disable no-new */
window.APP=new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // router 掛載設定
  router,
  store,
  // app.vue 掛載並 replace index.html 原始掛載點： <div id="app"></div>
  render: h => h( App )
})
