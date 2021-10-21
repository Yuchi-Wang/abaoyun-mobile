import request from '@/utils/request'

// 获取发票列表
export function getList(data) {
  return request({
    url: '/invoiceManager/getInvoiceList',
    method: 'post',
    data
  })
}

// 获取发票详情
export function getDetail(data) {
  return request({
    url: '/invoiceManager/getInvoiceDetail',
    method: 'post',
    data
  })
}

// 新增发票
export function createInvoice(data) {
  return request({
    url: '/invoiceManager/createInvoice',
    method: 'post',
    data
  })
}

// 更新发票
export function updateInvoice(data) {
  return request({
    url: '/invoiceManager/updateInvoice',
    method: 'post',
    data
  })
}

// 删除发票
export function deleteInvoice(data) {
  return request({
    url: '/invoiceManager/deleteInvoice',
    method: 'post',
    data
  })
}
