import request from '../utils/request'

// 获取手机验证码
export function getMobileMessage(data) {
  return request({
    url: '/loginType/sendTextMessage',
    method: 'post',
    data
  })
}

// 手机注册
export function phoneSign(data) {
  return request({
    url: '/loginType/userPhoneSign',
    method: 'post',
    data
  })
}

// 手机登录
export function mobileLogin(data) {
  return request({
    url: '/loginType/userPhoneLogin',
    method: 'post',
    data
  })
}

// 手机换绑
export function handleChangePhone(data) {
  return request({
    url: '/loginType/changePhoneNumber',
    method: 'post',
    data
  })
}

// 获取邮箱验证码
export function getEmailMessage(data) {
  return request({
    url: '/loginType/sendMail',
    method: 'post',
    data
  })
}

// 邮箱注册
export function emailSign(data) {
  return request({
    url: '/loginType/userEmailSign',
    method: 'post',
    data
  })
}

// 邮箱登录
export function emailLogin(data) {
  return request({
    url: '/loginType/userEmailLogin',
    method: 'post',
    data
  })
}

// 邮箱换绑
export function handleChangeEmail(data) {
  return request({
    url: '/loginType/changeEmail',
    method: 'post',
    data
  })
}

// 获取个人信息code
export function getUserCode(data) {
  return request({
    url: '/userManage/getUserCode',
    method: 'post',
    data
  })
}

// 获取个人信息
export function getUserInfo(data) {
  return request({
    url: '/userManage/getUserDetail',
    method: 'post',
    data
  })
}

// 编辑用户信息
export function editUserInfo(data) {
  return request({
    url: '/userManage/updateUser',
    method: 'post',
    data
  })
}

// 用户注销
export function cancelAccount(userCode) {
  return request({
    url: `/loginType/logoutUser/${userCode}`,
    method: 'get'
  })
}

// 密码登录
export function passwordLogin(data) {
  return request({
    url: 'loginType/phoneOrEmailPasswordLogin',
    method: 'post',
    data
  })
}

// 找回密码
export function foundPassword(data) {
  return request({
    url: 'loginType/phoneOrEmailPasswordRetrieve',
    method: 'post',
    data
  })
}
