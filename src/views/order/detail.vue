<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group v-if="orderShow">
      <van-cell title="订单状态" :border="false" :value="orderStatus" />
      <van-cell title="订单号" :border="false" :value="orderDetail.order_number" />
      <van-cell title="订单名称" :border="false" :value="orderDetail.product_name" />
      <van-cell title="订单数量" :border="false" :value="orderDetail.buy_num" />
      <van-cell title="订单金额" :border="false" :value="orderDetail.payment_amount" />
      <van-cell title="创建时间" :border="false" :value="orderDetail.createtime" />
      <van-cell title="付款时间" :border="false" :value="orderDetail.payment_time" />
      <van-cell title="支付方式" :border="false" :value="payStatus" />
      <van-cell v-if="orderDetail.order_status === '2'" title="支付剩余时间" :value="minute + '分' + seconds + '秒'" :border="false" />
      <!-- <van-cell title="付款人" :border="false" :value="orderDetail.payPeople" />
      <van-cell title="jar包下载" :border="false" is-link @click="jarPopup = true" /> -->
    </van-cell-group>
    <van-button
      v-if="orderDetail.payment_amount && orderDetail.order_status === '2'"
      type="primary"
      class="download-jar"
      :loading="cancleLoading"
      @click="cancleOrder"
    >
      取消支付
    </van-button>
    <van-button
      v-if="orderDetail.payment_amount && orderDetail.order_status === '2'"
      type="primary"
      class="download-jar"
      :loading="cancleLoading"
      @click="payAgain"
    >
      重新支付
    </van-button>
    <van-button
      v-if="orderDetail.payment_amount &&
        orderDetail.order_status === '1' &&
        orderDetail.contract_status !== '0' &&
        orderDetail.contract_status !== '1' &&
        orderDetail.contract_status !== '3'"
      type="primary"
      class="download-jar"
      :loading="applyContractLoading"
      @click="handleContract"
    >
      申请合同
    </van-button>
    <van-button
      v-if="orderDetail.payment_amount &&
        orderDetail.order_status === '1' &&
        orderDetail.invoice_status !== '1' &&
        orderDetail.invoice_status !== '2' &&
        orderDetail.invoice_status !== '4'"
      type="info"
      :loading="applyLoading"
      class="download-jar"
      @click="applyInvoice"
    >
      申请开票
    </van-button>
    <van-popup v-model="jarPopup" class="jar-popup">
      <h3>jar包地址</h3>
      <p>http://www.baidu.com</p>
    </van-popup>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { getUserInfo } from '@/api/user'
import { getDetail, updateOrder } from '@/api/order'
import { createContract } from '@/api/contract'
const orderStatusMap = {
  '1': '已付款',
  '2': '待支付',
  '3': '已取消'
}
const payStatusMap = {
  '1': '支付宝',
  '2': '微信',
  '3': '银行卡',
  '4': '账户余额',
  '5': '兑换劵'
}
export default {
  name: 'OrderDetail',
  data: () => ({
    detailId: -1,
    headerTitle: '订单详情',
    orderStatusMap,
    payStatusMap,
    orderDetail: {},
    jarPopup: false,
    applyLoading: false,
    applyContractLoading: false,
    cancleLoading: false,
    timer: null,
    minute: '',
    seconds: '',
    orderShow: false,
    failureTime: '',
    userType: ''
  }),
  computed: {
    orderStatus() {
      return this.orderStatusMap[this.orderDetail.order_status]
    },
    payStatus() {
      return this.payStatusMap[this.orderDetail.payment_type]
    }
  },
  created() {
    this.detailId = this.$route.query.id
    this.failureTime = this.$route.query.failuretime
    this.getDetail()
  },
  mounted() {
    this.countDown()
    this.getPersonal()
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    getPersonal() {
      const params = {
        user_code: localStorage.getItem('userCode')
      }
      getUserInfo(params).then(res => {
        this.userType = res.data.data.user_type
      })
    },
    applyInvoice() {
      if (this.userType != '') {
        this.applyLoading = true
        this.$router.push({
          name: 'applyInvoice',
          query: {
            orderId: this.detailId,
            type: 'apply'
          }
        })
      } else {
        Toast('您好，此操作需先在个人中心确认个人用户或企业用户')
        setTimeout(() => {
          this.$router.push('/personal-data')
        }, 1000)
      }
    },
    cancleOrder() {
      Dialog.confirm({
        title: '提示',
        message: '确认取消支付该订单吗？'
      }).then(() => {
        this.getDetail()
        setTimeout(() => {
          if (this.orderDetail.order_status === '2') {
            this.cancleLoading = true
            const params = {
              user_code: localStorage.getItem('userCode'),
              order_status: '3',
              order_number: this.orderDetail.order_number
            }
            updateOrder(params).then(res => {
              if (res.data.code === 200) {
                Toast('已取消该订单')
                this.getDetail()
              } else {
                this.cancleLoading = true
              }
            }).finally(() => {
              this.cancleLoading = false
            })
          }
        }, 300)
      }).catch(() => {
        // on cancel
      })
    },
    countDown() {
      const failureTime = this.failureTime.substring(0, this.failureTime.length - 2)
      const u = navigator.userAgent
      const ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      const failureTimeVaule = ios ? failureTime.replace(/-/g, '/') : failureTime
      const failureTimeStr = new Date(failureTimeVaule).getTime()
      this.timer = setInterval(() => {
        const DateNow = new Date().getTime()
        const countDownTime = failureTimeStr - DateNow
        if (countDownTime > 0) {
          this.minute = parseInt(countDownTime / 1000 / 60 % 60)
          this.seconds = parseInt(countDownTime / 1000 % 60)
        } else {
          clearInterval(this.timer)
          this.getDetail()
        }
      }, 1000)
      this.orderShow = true
    },
    handleContract() {
      this.applyContractLoading = true
      const params = {
        user_code: localStorage.getItem('userCode'),
        status: '3',
        contract_name: this.orderDetail.product_name,
        order_number: this.orderDetail.order_number
      }
      createContract(params).then(res => {
        if (res.data.code === 200) {
          Toast('已发起申请')
          this.$router.replace('/contract-list')
        } else {
          this.applyContractLoading = false
        }
      }).finally(() => {
        this.applyContractLoading = false
      })
    },
    payAgain() {
      this.getDetail()
      setTimeout(() => {
        if (this.orderDetail.order_status === '2') {
          window.location.href = this.orderDetail.adress
        }
      }, 300)
    },
    getDetail() {
      getDetail({ order_number: this.detailId }).then(res => {
        this.orderDetail = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group {
  margin: .8333rem;
  border-radius: .6667rem;
}
.van-button {
  background: #3C51FF;
  border-color: #3C51FF;
  color: #fff;
}
.download-jar {
  color: #fff;
  display: block;
  margin:3.083rem auto 0;
  width: 20.8333rem;
  height: 3.333rem;
  line-height: 3.333rem;
  background: #3C51FF;
  border-color: #3C51FF;
  border-radius: 1.6667rem;
}
.jar-popup {
  width: 20rem;
  padding: .75rem;
  h3 {
    position: relative;
    margin-left: 1.167rem;
    height: 1.667rem;
    line-height: 1.667rem;
    font-size: 1.1667rem;
    font-weight: 600;
    color: #000;
    &:after {
      content: "";
      position: absolute;
      width: .333rem;
      height: 1.5rem;
      background: #324BE3;
      left: -.667rem;
      border-radius: .167rem;
    }
  }
  p {
    width: 100%;
    background: #F8F8F8;
     margin-top: .55rem;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 1.167rem;
    text-align: center;
  }
}
</style>

