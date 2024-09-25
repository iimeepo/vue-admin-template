import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/article/list',
    method: 'get',
    params
  })
}

export function getCategory(params) {
  return request({
    url: '/api/article/category',
    method: 'get',
    params
  })
}
