import request from '@/utils/request'

// 获取产品列表
export function getList(data) {
  return request({
    url: '/productManage/getProductList',
    method: 'post',
    data
  })
}

// 获取产品详情
export function getDetail(data) {
  return request({
    url: '/productManage/getProductDetail',
    method: 'post',
    data
  })
}

// 获取产品套餐列表
export function getPackagesList(data) {
  return request({
    url: '/CloudPackagesManage/getCloudPackagesList',
    method: 'post',
    data
  })
}

// 获取产品套餐详情
export function getPackagesDetail(data) {
  return request({
    url: '/CloudPackagesManage/getCloudPackagesDetail',
    method: 'post',
    data
  })
}
