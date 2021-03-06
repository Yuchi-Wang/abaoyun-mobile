import request from '@/utils/request'

// 获取列表
export function getList(data) {
  return request({
    url: '/orderManage/getOrderList',
    method: 'post',
    data
  })
}

// 获取详情
export function getDetail(data) {
  return request({
    url: '/orderManage/getOrderDetail',
    method: 'post',
    data
  })
}

// 新增订单
export function createOrder(data) {
  return request({
    url: '/orderManage/insertOrder',
    method: 'post',
    data
  })
}

// 修改订单
export function updateOrder(data) {
  return request({
    url: '/orderManage/updateOrder',
    method: 'post',
    data
  })
}

// 删除订单
export function deleteOrder(data) {
  return request({
    url: '/orderManage/deleteOrder',
    method: 'post',
    data
  })
}
