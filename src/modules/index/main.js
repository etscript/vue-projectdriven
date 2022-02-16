import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from '@/store/index'

import http from '@/utils/httpIndex'
Vue.prototype.$get = http.get
Vue.prototype.$post = http.post

import '@/plugins/element.js'
import '@/plugins/mavonEditor.js'
import '@/plugins/iview.js'
import '@/plugins/highlightjs'

// 全局自定义组件
import MyLoading from '@/components/MyLoading'
Vue.use(MyLoading)

import MyPage from '@/components/MyPage'
Vue.use(MyPage)

import TextLoading from '@/components/TextLoading'
Vue.use(TextLoading)

Vue.prototype.$staticUrl = 'http://image.projectdriven.cn/'
// }
// Vue.prototype.$baseUrl = baseUrl
// // 引入ivew,
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
// Vue.use(iView)
// // 路由跳转开启进度条
// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start();
//   next();
// });
// router.afterEach(route => {
//   iView.LoadingBar.finish();
// });

if (process.env.NODE_ENV == "development") {
    Vue.prototype.$baseApiUrl = "http://localhost:5001/api/";
} else {
    Vue.prototype.$baseApiUrl = "https://projectdriven.cn/api/";
}

// console.log(process.env.NODE_ENV, '环境变量');


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')