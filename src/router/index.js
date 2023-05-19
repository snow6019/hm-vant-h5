import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import Layout from '@/views/Layout'

import Like from '@/views/Layout/Like'
import Article from '@/views/Layout/Article'
import Collect from '@/views/Layout/Collect'
import User from '@/views/Layout/User'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/article/:id', component: Detail },
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', redirect: '/article' },
      { path: '/article', component: Article },
      { path: '/like', component: Like },
      { path: '/collect', component: Collect },
      { path: '/user', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to: 到哪去
  // form: 从哪来
  const token = localStorage.getItem('h5-token')
  // 存在
  if (token) {
    next() // 能放行！
  } else { // 没有登录
    // 去的路由是 登录 或者注册
    if (to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
