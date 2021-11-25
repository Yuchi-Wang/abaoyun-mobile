import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Common/Layout'
const _resolve = file => resolve => require([`@/views/${file}.vue`], resolve)
Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: _resolve('home/default')
      }
    ]
  },
  {
    path: '/product-list',
    component: Layout,
    children: [
      {
        path: '',
        name: 'productlist',
        component: _resolve('product/list')
      }
    ]
  },
  {
    path: '/abao-detail',
    component: _resolve('product/abaoDetail'),
    name: 'abaoDetail'
  },
  {
    path: '/nlp-detail',
    component: _resolve('product/nlpDetail'),
    name: 'nlpDetail'
  },
  {
    path: '/service',
    component: Layout,
    children: [
      {
        path: '',
        name: 'service',
        component: _resolve('doc/list')
      }
    ]
  },
  {
    path: '/my',
    component: Layout,
    children: [
      {
        path: '',
        name: 'my',
        component: _resolve('user/my')
      }
    ]
  },
  {
    path: '/login',
    component: _resolve('user/login'),
    name: 'login'
  },
  {
    path: '/vcCode',
    component: _resolve('user/getVcCode'),
    name: 'vcCode'
  },
  {
    path: '/personal-data',
    component: _resolve('user/personalData'),
    name: 'personalData'
  },
  {
    path: '/edit-personal-data',
    component: _resolve('user/editPersonalData'),
    name: 'editPersonalData'
  },
  {
    path: '/confirm-binding',
    component: _resolve('user/confirmBinding'),
    name: 'confirmBinding'
  },
  {
    path: '/change-binding',
    component: _resolve('user/changeBinding'),
    name: 'changeBinding'
  },
  {
    path: '/abao-doc',
    component: _resolve('doc/abao'),
    name: 'aboDoc'
  },
  {
    path: '/nlp-doc',
    component: _resolve('doc/nlp'),
    name: 'nlpDoc'
  },
  {
    path: '/order-list',
    component: _resolve('order/list'),
    name: 'orderList'
  },
  {
    path: '/order-detail',
    component: _resolve('order/detail'),
    name: 'orderDetail'
  },
  {
    path: '/apply-invoice',
    component: _resolve('invoice/apply'),
    name: 'applyInvoice'
  },
  {
    path: '/invoice-list',
    component: _resolve('invoice/list'),
    name: 'invoiceList'
  },
  {
    path: '/invoice-detail',
    component: _resolve('invoice/detail'),
    name: 'invoiceDetail'
  },
  {
    path: '/message-list',
    component: _resolve('user/messageList'),
    name: 'messageList'
  },
  {
    path: '/message-detail',
    component: _resolve('user/messageDetail'),
    name: 'messageDetail'
  },
  {
    path: '/service-detail',
    component: _resolve('service/detail'),
    name: 'serviceDetail'
  },
  {
    path: '/service-list',
    component: _resolve('service/list'),
    name: 'serviceList'
  },
  {
    path: '/change-email',
    component: _resolve('user/changeEmailBinding'),
    name: 'changeEmailBinding'
  },
  {
    path: '/contract-list',
    component: _resolve('contract/list'),
    name: 'contractList'
  },
  {
    path: '/contract-detail',
    component: _resolve('contract/detail'),
    name: 'contractDetail'
  },
  {
    path: '/apply-contract',
    component: _resolve('contract/apply'),
    name: 'applyContract'
  },
  {
    path: '/chat-room',
    component: _resolve('user/chatRoom'),
    name: 'chatRoom'
  },
  {
    path: '/common-question',
    component: _resolve('user/commonQuestion'),
    name: 'commonQuestion'
  },
  {
    path: '/question-detail',
    component: _resolve('user/questionDetail'),
    name: 'questionDetail'
  },
  {
    path: '/about-us',
    component: _resolve('user/aboutUs'),
    name: 'aboutUs'
  },
  {
    path: '/edit-password',
    component: _resolve('user/editPassword'),
    name: 'editPassword'
  },
  {
    path: '/edit-paymentPwd',
    component: _resolve('user/editPaymentPwd'),
    name: 'editpaymentPwd'
  },
  {
    path: '/forgot-password',
    component: _resolve('user/forgotPassword'),
    name: 'forgotPassword'
  },
  {
    path: '/recharge',
    component: _resolve('recharge/index'),
    name: 'recharge'
  },
  {
    path: '/history-bill',
    component: _resolve('recharge/historyBill'),
    name: 'historyBill'
  },
  {
    path: '/recharge-explain',
    component: _resolve('recharge/explain'),
    name: 'rechargeExplain'
  },
  {
    path: '/recharge-uploader',
    component: _resolve('recharge/uploader'),
    name: 'rechargeUploader'
  },
  {
    path: '/recharge-withdrawal',
    component: _resolve('recharge/withdrawal'),
    name: 'rechargeWithdrawal'
  },
  {
    path: '/recharge-result',
    component: _resolve('recharge/result'),
    name: 'rechargeResult'
  },
  {
    path: '/recharge-withdrawalList',
    component: _resolve('recharge/withdrawalList'),
    name: 'rechargeWithdrawalList'
  },
  {
    path: '/recharge-billDetail',
    component: _resolve('recharge/billDetail'),
    name: 'rechargeBillDetail'
  },
  {
    path: '/forgot-paymentpwd',
    component: _resolve('user/forgotPaymentPwd'),
    name: 'forgotPaymentPwd'
  },
  {
    path: '/abao-serve',
    component: _resolve('service/demo'),
    name: 'serviceDemo'
  },
  {
    path: '/notice-detail',
    component: _resolve('user/noticeDetail'),
    name: 'noticeDetail'
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new VueRouter({
  routes: constantRoutes,
  scrollBehavior() {
    return new Promise(resolve => {
      resolve({ x: 0, y: 0 })
    })
  }
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
