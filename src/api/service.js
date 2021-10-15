import request from '@/utils/request'

// 获取服务列表
export function getList(data) {
  return request({
    url: '/chatManager/getChatNameStatistics',
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

// 获取阿宝统计次数
export function getChatStatistics(data) {
  return request({
    url: '/chatManager/getChatStatistics',
    method: 'post',
    data
  })
}

// 获取sdk api列表
export function getServiceModeList(data) {
  return request({
    url: '/productManage/getServiceModeList',
    method: 'post',
    data
  })
}

// 阿宝聊天对话接口
export function getChatDialogue(data) {
  return request({
    url: '/chatManager/getChatDialogue',
    method: 'post',
    data
  })
}

// 获取聊天记录
export function getChatList(data) {
  return request({
    url: '/chatManager/getChatRecordList',
    method: 'post',
    data
  })
}
