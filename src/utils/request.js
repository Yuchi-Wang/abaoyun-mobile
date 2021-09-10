import axios from 'axios'
import { Toast, Dialog } from 'vant'
import { getToken } from '@/utils/auth'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 25000,
  withCredentials: false
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    const ip = sessionStorage.getItem('ip')
    const userCode = localStorage.getItem('userCode')
    if (token) {
      config.headers['token'] = token
    }
    if (ip) {
      config.headers['ipAdress'] = ip
    }
    if (userCode) {
      config.headers['userCode'] = userCode
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return Promise.resolve(response)
    } else if (res.code === 500 || res.code === 502) {
      Toast(res.msg)
      return Promise.reject(res)
    } else {
      Toast(res.msg)
      return response
    }
  },
  error => {
    const errorResponse = error.response
    if (errorResponse) {
      if (errorResponse.status === 401) {
        Dialog.alert({
          title: '提示',
          message: '请登录'
        }).then(() => {
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
        })
      } else if (errorResponse.status === 500 || errorResponse.status === 502) {
        Toast('系统错误')
      } else if (errorResponse.status === 404) {
        Toast('404')
      } else {
        Toast(errorResponse)
      }
    } else {
      Toast('连接超时')
    }
    return Promise.reject(error)
  })

// 封装post请求，便于请求第三方接口
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export default service
