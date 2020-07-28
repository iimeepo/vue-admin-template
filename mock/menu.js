const list = [
  {
    id: 1,
    sort: 1,
    status: 1,
    path: '/ads',
    name: 'Ads',
    title: '广告管理',
    icon: 'el-icon-help',
    children: [{
      id: 2,
      sort: 1,
      status: 1,
      path: '/ads/banner',
      name: 'Banner',
      title: '广告管理'
    }, {
      id: 3,
      sort: 1,
      status: 1,
      path: '/ads/link',
      name: 'Link',
      title: '友情链接'
    }]
  },
  {
    id: 4,
    sort: 1,
    status: 1,
    path: '/article',
    name: 'Article',
    title: '文章管理',
    icon: 'el-icon-document',
    children: [
      {
        id: 5,
        sort: 1,
        status: 1,
        path: '/articlelist',
        name: 'ArticleList',
        title: '文章管理'
      },
      {
        id: 6,
        sort: 1,
        status: 1,
        path: '/articlecategory',
        name: 'ArticleCategory',
        title: '文章分类'
      }
    ]
  },
  {
    id: 7,
    sort: 1,
    status: 1,
    path: '/data',
    name: 'Data',
    title: '数据统计',
    icon: 'el-icon-s-data',
    children: [
      {
        id: 8,
        sort: 1,
        status: 1,
        path: '/data/article',
        name: 'Article',
        title: '文章统计'
      }
    ]
  },
  {
    id: 9,
    sort: 1,
    status: 1,
    path: '/nested',
    name: 'Nested',
    title: '多级菜单',
    icon: 'el-icon-s-operation',
    children: [
      {
        id: 10,
        sort: 1,
        status: 1,
        path: '/nested/menu1',
        name: 'Menu1',
        title: '二级菜单',
        children: [
          {
            id: 11,
            sort: 1,
            status: 1,
            path: '/nested/menu1/menu1-1',
            name: 'Menu1-1',
            title: '三级菜单'
          },
          {
            id: 12,
            sort: 1,
            status: 1,
            path: '/nested/menu1/menu1-2',
            name: 'Menu1-2',
            title: '三级菜单',
            children: [
              {
                id: 13,
                sort: 1,
                status: 1,
                path: '/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                title: '四级菜单'
              },
              {
                id: 14,
                sort: 1,
                status: 1,
                path: '/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                title: '四级菜单'
              }
            ]
          },
          {
            id: 15,
            sort: 1,
            status: 1,
            path: '/nested/menu1/menu1-3',
            name: 'Menu1-3',
            title: '三级菜单'
          }
        ]
      },
      {
        id: 16,
        sort: 1,
        status: 1,
        path: '/nested/menu2',
        name: 'Menu2',
        title: '二级菜单'
      }
    ]
  },
  {
    id: 17,
    sort: 1,
    status: 1,
    path: '/site',
    name: 'Site',
    title: '基础设置',
    children: [
      {
        id: 18,
        sort: 1,
        status: 1,
        path: '/site/index',
        name: 'SiteSet',
        title: '站点设置',
        icon: 'el-icon-setting'
      }
    ]
  },
  {
    id: 19,
    sort: 1,
    status: 1,
    path: '/setting',
    name: 'Setting',
    title: '系统管理',
    icon: 'el-icon-s-tools',
    children: [
      {
        id: 20,
        sort: 1,
        status: 1,
        path: '/setting/user',
        name: 'User',
        title: '用户管理'
      },
      {
        id: 21,
        sort: 1,
        status: 1,
        path: '/setting/role',
        name: 'Role',
        title: '角色管理'
      },
      {
        id: 22,
        sort: 1,
        status: 1,
        path: '/setting/menu',
        name: 'Menu',
        title: '菜单管理'
      },
      {
        id: 23,
        sort: 1,
        status: 1,
        path: '/setting/log',
        name: 'Log',
        title: '日志管理'
      }
    ]
  },
  {
    id: 24,
    sort: 1,
    status: 1,
    path: 'external-link',
    title: '外链',
    children: [
      {
        id: 25,
        sort: 1,
        status: 1,
        path: 'https://panjiachen.gitee.io/vue-element-admin-site/zh/',
        title: '文档',
        icon: 'el-icon-link'
      }
    ]
  }
]

module.exports = [
  {
    url: '/vue-admin-template/menu/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          list: list
        }
      }
    }
  }
]
