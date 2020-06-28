import { createRouter, createWebHashHistory } from 'vue-router'
import setup from '../views/setup.vue'

const routes = [
  {
    path: '/',
    name: 'setup',
    component: setup
  },
  {
    path: '/util',
    name: 'util',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/util.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
