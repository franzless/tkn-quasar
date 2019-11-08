import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/timeline',
    name: 'timeline',   
    component: () => import('../views/timeline.vue')
  },
  {
    path: '/charts',
    name: 'charts',   
    component: () => import('../views/charts.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
