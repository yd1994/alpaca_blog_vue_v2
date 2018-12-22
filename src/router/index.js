import Vue from 'vue'
import VueRouter from 'vue-router'
import { Notify, LocalStorage } from 'quasar'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
})

Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = LocalStorage.get.item('tokenAccessToken')
    if (token !== undefined) {
      let tokenExpiresTime = LocalStorage.get.item('tokenExpiresTime')
      if (tokenExpiresTime !== undefined && new Date().getTime() < tokenExpiresTime) {
        // token存在并且未过期
        next()
        return
      }
    }
    Notify.create({
      message: `需要登录!`,
      type: 'positive',
      color: 'positive',
      position: 'top'
    })
    next({ path: '/admin/login' })
    return
  }
  next()
})
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  return Router
}
