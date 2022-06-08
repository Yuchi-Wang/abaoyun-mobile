import request from '@/utils/request'

// 获取聊天列表
export function getList(data) {
  return request({
    url: '/ChatHelperManage/getChatHelperList',
    method: 'post',
    data
  })
}
// 获取随机列表
export function getRollQuestion(data) {
  return request({
    url: '/ChatHelperManage/getChatHelperRowList',
    method: 'post',
    data
  })
}
