<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-cell title="订单号" :border="false" :value="orderDetail.order_number" />
      <van-cell title="订单名称" :border="false" :value="orderDetail.product_name" />
      <van-cell title="订单数量" :border="false" :value="orderDetail.buy_num" />
      <van-cell title="订单金额" :border="false" :value="orderDetail.payment_amount" />
      <van-cell title="创建时间" :border="false" :value="orderDetail.createtime" />
      <van-cell title="付款时间" :border="false" :value="orderDetail.payment_time" />
      <van-cell title="付款人" :border="false" :value="orderDetail.payPeople" />
      <van-cell title="jar包下载" :border="false" is-link @click="jarPopup = true" />
    </van-cell-group>
    <van-button
    v-if="orderDetail.payment_amount &&
      orderDetail.contract_status !== '0' &&
      orderDetail.contract_status !== '1' &&
      orderDetail.contract_status !== '3'"
    type="primary"
    class="download-jar"
    @click="handleContract"
    :loading="applyContractLoading"
    >
      申请合同
    </van-button>
    <van-button
      v-if="orderDetail.payment_amount &&
        orderDetail.invoice_status !== '1' &&
        orderDetail.invoice_status !== '2' &&
        orderDetail.invoice_status !== '4'"
      type="info"
      @click="applyInvoice"
      :loading="applyLoading"
      class="download-jar"
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
import { Toast } from 'vant'
import { getDetail } from '@/api/order'
import { createContract } from '@/api/contract'
export default {
  name: 'OrderDetail',
  data: () => ({
    detailId: -1,
    headerTitle: '订单详情',
    orderDetail: {},
    jarPopup: false,
    applyLoading: false,
    applyContractLoading: false
  }),
  mounted() {
    this.detailId = this.$route.query.id
    this.getDetail()
  },
  methods: {
    applyInvoice() {
      this.applyLoading = true
      this.$router.push({
        name: 'applyInvoice',
        query: {
          orderId: this.detailId,
          type: 'apply'
        }
      })
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

