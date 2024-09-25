import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/log/list',
    method: 'get',
    params
  })
}
