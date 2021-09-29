import request from '../utils/request'

// 获取消息列表
export function getMessageList(data) {
  return request({
    url: '/InformationManage/getInformationList',
    method: 'post',
    data
  })
}

// 获取消息详情
export function getDetail(data) {
  return request({
    url: '/InformationManage/getInformationDetail',
    method: 'post',
    data
  })
}

// 删除消息
export function deleteMessage(data) {
  return request({
    url: '/InformationManage/deleteInformation',
    method: 'post',
    data
  })
}

// 更新消息
export function updateInfo(data) {
  return request({
    url: '/InformationManage/updateInformation',
    method: 'post',
    data
  })
}
