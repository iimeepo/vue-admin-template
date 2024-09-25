import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/role/list',
    method: 'get',
    params
  })
}
