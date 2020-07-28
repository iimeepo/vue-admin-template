import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/article/list',
    method: 'get',
    params
  })
}

export function getCategory(params) {
  return request({
    url: '/vue-admin-template/article/category',
    method: 'get',
    params
  })
}
