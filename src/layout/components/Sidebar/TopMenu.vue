<template>
  <div class="top-menu-bar">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="horizontal"
      >
        <template v-for="route in permission_routes">
          <template v-if="!route.hidden && getFirstShowingChild(route.children,route)">
            <el-menu-item v-if="route.meta" :key="route.path" :index="resolvePath(route)" @click="jumpTo(route)">
              <item :icon="route.meta&&route.meta.icon" :title="route.meta.title" />
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import variables from '@/styles/variables.scss'

export default {
  components: { Item },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, matched } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      store.dispatch('permission/changeSecondRoutes', matched[0])
      return matched[0].path || '/'
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
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
      this.$router.push(path.resolve(route.path, route.redirect || ''))
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu-bar {
  .el-menu--horizontal.el-menu {
    display: flex;
  }
  .el-menu--horizontal>.el-menu-item {
    height: 50px !important;
    line-height: 50px !important;
  }
  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 50px !important;
    line-height: 50px !important;
  }
  .svg-icon {
    margin-right: 5px;
  }
  .el-scrollbar__bar.is-horizontal {
    display: none;
  }
  ::v-deep .el-scrollbar__thumb {
    background-color: rgba(255, 255, 255, 0.5);
    &:hover {
      background-color: rgba(64,158,255,1);
    }
  }
}
.mobile {
  .top-menu-bar {
    ::v-deep .el-menu--horizontal>.el-menu-item {
      padding: 0 10px;
      display: inline-block;

      .sub-el-icon {
        display: none;
      }

      .svg-icon {
        display: none;
      }
    }

    ::v-deep .el-scrollbar__thumb {
      display: none;
      &:hover {
        display: none;
      }
    }
  }
}
</style>
