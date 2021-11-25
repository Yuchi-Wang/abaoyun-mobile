import request from '@/utils/request'

// 获取审核列表
export function getList(data) {
  return request({
    url: '/CheckManage/getCheckList',
    method: 'post',
    data
  })
}

// 获取审核详情
export function getDetail(data) {
  return request({
    url: '/CheckManage/getCheckDetail',
    method: 'post',
    data
  })
}

// 新增审核信息
export function createCheck(data) {
  return request({
    url: '/CheckManage/insertCheck',
    method: 'post',
    data
  })
}

// 删除审核信息
export function deleteCheck(data) {
  return request({
    url: '/CheckManage/deleteCheck',
    method: 'post',
    data
  })
}

// 获取银行卡列表
export function getBankCardNumList(data) {
  return request({
    url: '/CheckManage/getCreditCardList',
    method: 'post',
    data
  })
}