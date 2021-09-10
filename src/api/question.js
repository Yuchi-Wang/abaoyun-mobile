import request from '../utils/request'

// 获取列表
export function getList(data) {
  return request({
    url: '/commonQuestion/getQuestionList',
    method: 'post',
    data
  })
}

// 获取详情
export function getDetail(data) {
  return request({
    url: '/commonQuestion/getQuestionDetail',
    method: 'post',
    data
  })
}
