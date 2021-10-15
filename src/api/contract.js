import request from '@/utils/request'

// 获取合同详情
export function getDetail(data) {
  return request({
    url: '/contractManager/getContractList',
    method: 'post',
    data
  })
}
