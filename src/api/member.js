import request from '@/utils/request'

export function getMemberList () {
    return request({
      url: '/mem-basics',
      method:'get'
    })
  }
export function getMemberEduList () {
    return request({
        url: '/educations',
        method:'get'
    })
}
export function getMemberFamilyList () {
    return request({
        url: '/families',
        method:'get'
    })
}

export function getAllMember () {
    return request({
        url: '/mem-families',
        method:'get'
    })
}