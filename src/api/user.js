import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function getList(params) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}
