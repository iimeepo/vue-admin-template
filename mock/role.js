const Mock = require('mockjs')

const data = Mock.mock({
  'items|6': [{
    'id|+1': 1,
    name: '@string("lower", 6)',
    title: '@ctitle',
    perm: [],
    'status|1': [0, 1]
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/role/list',
    type: 'get',
    response: config => {
      const { page, limit, keyword } = config.query
      const items = data.items
      const _list = items.filter((val) => {
        let flag = true
        if (typeof keyword !== 'undefined' && flag) {
          flag = val.title.indexOf(keyword) !== -1 || val.name.indexOf(keyword) !== -1
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
