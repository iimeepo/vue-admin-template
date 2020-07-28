const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    'id|+1': 1,
    title: '@ctitle(20, 25)',
    'level|1': ['DEBUG', 'INFO', 'WARNING', 'ERROR'],
    'method|1': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    time: '@float(100, 300, 3, 3)',
    author: '@cname',
    created_at: '@datetime',
    ip: '@ip'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/log/list',
    type: 'get',
    response: config => {
      const { page, limit, created_at, level, method, keyword } = config.query
      const items = data.items
      const _list = items.filter((val) => {
        let flag = true
        if (typeof level !== 'undefined' && flag) {
          flag = val.level === level
        }
        if (typeof method !== 'undefined' && flag) {
          flag = val.method === method
        }
        if (typeof keyword !== 'undefined' && flag) {
          flag = val.title.indexOf(keyword) !== -1 || val.author.indexOf(keyword) !== -1
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
  }
]
