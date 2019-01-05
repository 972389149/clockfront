// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from './axios'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'

 

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 
Vue.use(ElementUI);


router.beforeEach((to, from, next) => {
 if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  if (sessionStorage.getItem("Login") == 'true') {
   next();
  }
  else {
   next({
    path: '/'
   })
  }
 }
 else {
  next();
 }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
