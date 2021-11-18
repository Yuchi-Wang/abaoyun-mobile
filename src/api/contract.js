import request from '@/utils/request'

// 申请合同
export function createContract(data) {
  return request({
    url: '/contractManager/createContract',
    method: 'post',
    data
  })
}

// 获取合同列表
export function getList(data) {
  return request({
    url: '/contractManager/getContractList',
    method: 'post',
    data
  })
}

// 获取合同详情
export function getDetail(data) {
  return request({
    url: '/contractManager/getContractDetail',
    method: 'post',
    data
  })
}

// 删除合同
export function deleteContract(data) {
  return request({
    url: '/contractManager/deleteContract',
    method: 'post',
    data
  })
}

// 更新合同
export function updateContract(data) {
  return request({
    url: '/contractManager/updateContract',
    method: 'post',
    data
  })
}

// 获取合同模板列表
export function getTemplateList(data) {
  return request({
    url: '/templateContractManager/getTemplateList',
    method: 'post',
    data
  })
}
