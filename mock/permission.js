
const routes = [
  {
    path: '/ads',
    component: 'Layout',
    redirect: '/ads/banner',
    name: 'Ads',
    meta: { title: '广告管理', icon: 'el-icon-help' },
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: 'views/banner/index',
        meta: { title: '轮播图' }
      },
      {
        path: 'link',
        name: 'Link',
        component: 'views/link/index',
        meta: { title: '友情链接' }
      }
    ]
  },

  {
    path: '/article',
    component: 'Layout',
    redirect: '/article/list',
    name: 'Article',
    meta: { title: '文章管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: 'views/article/index',
        meta: { title: '文章管理' }
      },
      {
        path: 'category',
        name: 'ArticleCategory',
        component: 'views/article/category',
        meta: { title: '文章分类' }
      }
    ]
  },

  {
    path: '/data',
    component: 'Layout',
    redirect: '/data/article',
    alwaysShow: true,
    name: 'Data',
    meta: { title: '数据统计', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'article',
        name: 'Article',
        component: 'views/data/index',
        meta: { title: '文章统计' }
      }
    ]
  },

  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '多级菜单',
      icon: 'el-icon-s-operation'
    },
    children: [
      {
        path: 'menu1',
        component: 'views/nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: '二级菜单' },
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1/index',
            name: 'Menu1-1',
            meta: { title: '三级菜单' }
          },
          {
            path: 'menu1-2',
            component: 'views/nested/menu1/menu1-2/index',
            name: 'Menu1-2',
            meta: { title: '三级菜单' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1/index',
                name: 'Menu1-2-1',
                meta: { title: '四级菜单' }
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2/index',
                name: 'Menu1-2-2',
                meta: { title: '四级菜单' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3/index',
            name: 'Menu1-3',
            meta: { title: '三级菜单' }
          }
        ]
      },
      {
        path: 'menu2',
        component: 'views/nested/menu2/index',
        name: 'Menu2',
        meta: { title: '二级菜单' }
      }
    ]
  },

  {
    path: '/site',
    component: 'Layout',
    children: [
      {
        path: 'index',
        name: 'Site',
        component: 'views/site/index',
        meta: { title: '站点设置', icon: 'el-icon-setting' }
      }
    ]
  },

  {
    path: '/setting',
    component: 'Layout',
    redirect: '/setting/user',
    name: 'Setting',
    meta: { title: '系统管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: 'views/user/index',
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'Role',
        component: 'views/role/index',
        meta: { title: '角色管理' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: 'views/menu/index',
        meta: { title: '菜单管理' }
      },
      {
        path: 'log',
        name: 'Log',
        component: 'views/log/index',
        meta: { title: '日志管理' }
      }
    ]
  },

  {
    path: 'external-link',
    component: 'Layout',
    children: [
      {
        path: 'https://panjiachen.gitee.io/vue-element-admin-site/zh/',
        meta: { title: '文档', icon: 'el-icon-link' }
      }
    ]
  }
]

module.exports = [
  // get routes
  {
    url: '/vue-admin-template/permission/getroutes',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: { list: routes }
      }
    }
  }
]
