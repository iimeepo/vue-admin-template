import { constantRoutes } from '@/router'
import { getroutes } from '@/api/permission'
import Layout from '@/layout'

/**
 * 循环生成异步路由
 * @Author   HarveyCheng
 * @DateTime 2018-10-09
 * @param    {[type]}    routes [description]
 * @return   {[type]}           [description]
 */
function loopCreateRouter(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    const tpl = Object.assign({}, tmp)
    if (typeof tmp['component'] !== 'undefined' && tmp['component']) {
      if (tmp['component'] === 'Layout') {
        tpl['component'] = Layout
      } else {
        tpl['component'] = resolve => require([`../../${tmp['component']}.vue`], resolve)
      }
    }
    if (tmp['children']) {
      tpl['children'] = loopCreateRouter(tmp['children'])
    }
    // const tpl = {}
    // Object.assign({}, tmp)
    /* tpl['name'] = tmp['name']
    tpl['path'] = tmp['path']
    tpl['hidden'] = tmp['hidden']
    if (typeof tmp['component'] !== 'undefined' && tmp['component']) {
      if (tmp['component'] === 'Layout') {
        tpl['component'] = Layout
      } else {
        tpl['component'] = resolve => require([`../../${tmp['component']}.vue`], resolve)
      }
    }
    if (typeof tmp['redirect'] !== 'undefined') {
      tpl['redirect'] = tmp['redirect']
    }
    if (typeof tmp['alwaysShow'] !== 'undefined') {
      tpl['alwaysShow'] = tmp['alwaysShow']
    }
    if (typeof tmp['meta'] !== 'undefined') {
      tpl['meta'] = tmp['meta']
    }
    if (tmp['children']) {
      tpl['children'] = loopCreateRouter(tmp['children'])
    } */
    res.push(tpl)
  })
  return res
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getroutes().then(response => {
        const { data } = response
        const asyncRouterMap = data.list
        const accessedRoutes = loopCreateRouter(asyncRouterMap)
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', constantRoutes.concat(accessedRoutes))
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
