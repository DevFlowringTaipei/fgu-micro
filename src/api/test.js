import request from '@/utils/request'

export function getMemberList () {
  return request({
    url: '/books',
    method:'get'
  })
}