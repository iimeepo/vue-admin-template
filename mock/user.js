const Mock = require('mockjs')

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const data = Mock.mock({
  'items|32': [{
    'id|+1': 1,
    username: '@string("lower", 6, 10)',
    truename: '@cname',
    'type|1': ['管理员', '编辑'],
    email: '@email',
    role: ['超级管理员'],
    ip: '@ip',
    'status|1': [0, 1],
    last_time: '@datetime',
    created_at: '@datetime'
  }]
})

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  {
    url: '/vue-admin-template/user/list',
    type: 'get',
    response: config => {
      const { page, limit, created_at, status, keyword } = config.query
      const items = data.items
      const _list = items.filter((val) => {
        let flag = true
        if (typeof status !== 'undefined' && flag) {
          flag = parseInt(val.status) === parseInt(status)
        }
        if (typeof keyword !== 'undefined' && flag) {
          flag = val.username.indexOf(keyword) !== -1 || val.truename.indexOf(keyword) !== -1
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

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
