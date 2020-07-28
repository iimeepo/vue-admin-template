import request from '@/utils/request'

export function getroutes() {
  return request({
    url: '/vue-admin-template/permission/getroutes',
    method: 'get'
  })
}
