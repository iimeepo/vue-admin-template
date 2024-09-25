import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/banner/list',
    method: 'get',
    params
  })
}
