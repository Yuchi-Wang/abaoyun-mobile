import request from '@/utils/request'

// 支付宝支付
export function aliPay(data) {
  return request({
    url: '/paymentManage/AliPay',
    method: 'post',
    data
  })
}

export function weChatPay(data) {
  return request({
    url: '/paymentManage/WxPay',
    method: 'post',
    data
  })
}

// 微信H5支付
export function weChatH5Pay(data) {
  return request({
    url: '/wechat/H5Pay',
    method: 'post',
    data
  })
}