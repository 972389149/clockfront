import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import chief from '@/pages/chief'
import login from '@/components/login'
import register from '@/components/register'
import resetPwd from '@/components/resetPwd'
import about from '@/components/about'
import group from '@/components/group'
import user from '@/components/user'
import record from '@/components/record'
import numberChart from '@/components/echarts/numberChart'
import placeChart from '@/components/echarts/placeChart'
import userChart from '@/components/echarts/userChart'
import userOneChart from '@/components/echarts/userOneChart'
import index from '@/components/index'
import message from '@/components/message'
import personCenter from '@/components/personCenter'
import search from '@/components/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect: '/login',
      children: [{
      	path: 'login',
      	name: 'login',
      	component: login
      },{
      	path: 'register',
      	name: 'register',
      	component: register
      }],
    },
    {
    	path: '/chief',
    	name: 'chief',
      meta: {
       requireAuth: true, 
      },
    	component: chief,
      children: [{
        path: 'index',
        name: 'index',
        meta: {
         requireAuth: true, 
        },
        component: index
      },{
        path: 'message',
        name: 'message',
        meta: {
         requireAuth: true, 
        },
        component: message
      },{
        path: 'search',
        name: 'search',
        meta: {
         requireAuth: true, 
        },
        component: search
      },{
        path: 'group',
        name: 'group',
        meta: {
         requireAuth: true, 
        },
        component: group
      },{
        path: 'user',
        name: 'user',
        meta: {
         requireAuth: true, 
        },
        component: user
      },{
        path: 'record',
        name: 'record',
        meta: {
         requireAuth: true, 
        },
        children: [{
          path: 'numberChart',
          name: 'numberChart',
          component: numberChart
        },{
          path: 'placeChart',
          name: 'placeChart',
          component: placeChart
        },{
          path: 'userChart',
          name: 'userChart',
          children: [{
            path: 'userOneChart',
            name: 'userOneChart',
            component: userOneChart
          }],
          component: userChart
        }],
        component: record
      },{
        path: 'personCenter',
        name: 'personCenter',
        meta: {
         requireAuth: true, 
        },
        component: personCenter
      },{
        path: 'about',
        name: 'about',
        meta: {
         requireAuth: true, 
        },
        component: about
      }]
    },
    {
      path: '/resetPwd',
      name: 'resetPwd',
      meta: {
       requireAuth: false, 
      },
      component: resetPwd
    }
  ]
})
