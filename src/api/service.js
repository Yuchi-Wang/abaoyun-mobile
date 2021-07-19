import request from '@/utils/request'

// 获取服务列表
export function getList(data) {
  return request({
    url: '/serviceModule/getServiceList',
    method: 'post',
    data
  })
}

// 获取服务详情
export function getDetail(data) {
  return request({
    url: '/serviceModule/getServiceDetail',
    method: 'post',
    data
  })
}
