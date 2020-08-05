<template>
  <div v-if="second_routes.length > 0">
    <div class="sidebar-container">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
          :collapse="isCollapse"
          :collapse-transition="false"
          mode="vertical"
        >
          <template v-if="isCollapse">
            <el-menu
              :default-active="activeMenu"
              :collapse="isCollapse"
              :background-color="variables.menuBg"
              :text-color="variables.menuText"
              :unique-opened="false"
              :active-text-color="variables.menuActiveText"
              :collapse-transition="false"
              mode="vertical"
            >
              <sidebar-item v-for="route in second_routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
          </template>
          <template v-else>
            <template v-for="route in second_routes">
              <template v-if="!route.hidden && getFirstShowingChild(route.children,route)">
                <el-menu-item v-if="route.meta" :key="route.path" :index="resolvePath(route)" @click="jumpTo(route)">
                  <item :icon="route.meta&&route.meta.icon" :title="route.meta.title" />
                </el-menu-item>
              </template>
            </template>
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
    <div v-if="third_routes.length > 0 && !isCollapse" class="sub-sidebar-container">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeSubMenu"
          :collapse="isCollapse"
          :unique-opened="false"
          :collapse-transition="false"
          mode="vertical"
        >
          <sidebar-item v-for="route in third_routes" :key="route.path" :item="route" :base-path="route.path" :is-nest="true" />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import path from 'path'
import { isExternal } from '@/utils/validate'
import SidebarItem from './SidebarItem'
import Item from './Item'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Item },
  computed: {
    ...mapGetters([
      'permission_routes',
      'second_routes',
      'third_routes',
      'sidebar'
    ]),
    classObj() {
      return {
        subMenu: this.third_routes.length > 0
      }
    },
    activeMenu() {
      const route = this.$route
      const { meta, matched } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      store.dispatch('permission/changeThirdRoutes', matched[1] || [])
      return matched[1].path || ''
    },
    activeSubMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    getFirstShowingChild(children = [], parent) {
      let showing = true
      if (parent.hidden || (typeof parent.path === 'undefined' && typeof parent.redirect === 'undefined')) {
        showing = false
      }
      if (!children) {
        return showing
      }
      const showingChildren = children.find(item => {
        return !item.hidden && item.path
      })
      if (typeof showingChildren !== 'undefined') {
        if (showingChildren.path && parent.alwaysShow && !parent.redirect) {
          parent.redirect = showingChildren.path
        }
        if (typeof parent.meta === 'undefined' && typeof showingChildren.meta !== 'undefined') {
          parent.meta = showingChildren.meta
        }
        showing = true
      }
      return showing
    },
    resolvePath(route) {
      if (isExternal(route.path)) {
        return route.path
      }
      if (isExternal(route.redirect)) {
        return route.redirect
      }
      return route.path
    },
    jumpTo(route) {
      if (isExternal(route.path)) {
        window.open(route.path, '_blank')
        return
      }
      if (isExternal(route.redirect)) {
        window.open(route.redirect, '_blank')
        return
      }
      if (route.children && route.children.length > 2 && this.device === 'mobile') {
        store.dispatch('permission/changeThirdRoutes', route)
        return
      }
      this.$router.push(path.resolve(route.path, route.redirect || ''))
    }
  }
}
</script>
