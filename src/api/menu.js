import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/menu/list',
    method: 'get',
    params
  })
}
