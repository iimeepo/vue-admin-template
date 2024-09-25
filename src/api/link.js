import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/link/list',
    method: 'get',
    params
  })
}
