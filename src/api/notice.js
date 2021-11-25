import request from '../utils/request'

// 获取消息列表
export function getList(data) {
  return request({
    url: '/NoticeManager/getNoticeList',
    method: 'post',
    data
  })
}

// 获取消息详情
export function getDetail(data) {
  return request({
    url: '/NoticeManager/getNoticeDetail',
    method: 'post',
    data
  })
}
