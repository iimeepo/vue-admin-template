const Mock = require('mockjs')

const data = Mock.mock({
  'items|6': [{
    'id|+1': 1,
    sort: 1,
    title: '@ctitle',
    link: '@url("http")',
    'status|1': [0, 1]
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/link/list',
    type: 'get',
    response: config => {
      const { page, limit, keyword } = config.query
      const items = data.items
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
