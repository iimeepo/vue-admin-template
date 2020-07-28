import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/log/list',
    method: 'get',
    params
  })
}
