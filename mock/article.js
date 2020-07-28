const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    'id|+1': 1,
    icon: '@image("100x50")',
    title: '@ctitle(20, 25)',
    'category|1': ['新闻', '公告', '动态'],
    read: '@integer(0,1000)',
    comment: '@integer(0,1000)',
    created_at: '@datetime',
    content: `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
    <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
  </ul>`,
    author: '@cname',
    'status|1': [0, 1]
  }]
})

const category = Mock.mock({
  'items|6': [{
    'id|+1': 1,
    title: '@ctitle',
    'status|1': [0, 1]
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/article/list',
    type: 'get',
    response: config => {
      const { page, limit, created_at, category, status, keyword } = config.query
      const items = data.items
      const _list = items.filter((val) => {
        let flag = true
        if (typeof category !== 'undefined' && flag) {
          flag = val.category === category
        }
        if (typeof status !== 'undefined' && flag) {
          flag = val.status === status
        }
        if (typeof keyword !== 'undefined' && flag) {
          flag = val.title.indexOf(keyword) !== -1
        }
        if (typeof created_at !== 'undefined' && created_at.length === 2 && flag) {
          const created = new Date(Date.parse(val.created_at))
          const start_time = new Date(Date.parse(created_at[0]))
          const end_time = new Date(Date.parse(created_at[1]))
          flag = created >= start_time && created <= end_time
        }
        return flag
      })
      const total = _list.length
      const list = _list.slice((page - 1) * limit, limit * page)
      return {
        code: 20000,
        data: {
          total: total,
          items: list
        }
      }
    }
  },
  {
    url: '/vue-admin-template/article/category',
    type: 'get',
    response: config => {
      const { page, limit, keyword } = config.query
      const items = category.items
      const _list = items.filter((val) => {
        let flag = true
        if (typeof keyword !== 'undefined' && flag) {
          flag = val.title.indexOf(keyword) !== -1
        }
        return flag
      })
      const total = _list.length
      const list = _list.slice((page - 1) * limit, limit * page)
      return {
        code: 20000,
        data: {
          total: total,
          items: list
        }
      }
    }
  }
]
