import request from '@/utils/request'

export function getroutes() {
  return request({
    url: '/api/permission/getroutes',
    method: 'get'
  })
}
