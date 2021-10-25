<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-cell :title="billStausTitle + '账单号'" :border="false" :value="billDetail.check_id" />
      <van-cell :title="billStausTitle + '状态'" :border="false" :value="billStatus" />
      <van-cell v-if="billDetail.check_status === '2'" title="拒绝理由" :border="false" :value="billDetail.reason" />
      <van-cell :title="billStausTitle + '银行卡号'" :border="false" :value="billDetail.credit_card" />
      <van-cell :title="billStausTitle + '金额'" :border="false" :value="'￥' + billDetail.money" />
      <van-cell v-if="billDetail.name" title="申请人" :border="false" :value="billDetail.name" />
      <van-cell title="申请时间" v-if="billDetail.createtime" :border="false" :value="billDetail.createtime.substring(0, billDetail.createtime.length - 2)" />
    </van-cell-group>
  </div>
</template>

<script>
import { getDetail } from '@/api/check'
const billStatusMap = {
  '1': '审核中',
  '2': '审核未通过',
  '3': '审核通过'
}
export default {
  name: 'InvoiceDetail',
  data: () => ({
    detailId: -1,
    headerTitle: '',
    billDetail: {},
    billStatusMap,
    billStausTitle: ''
  }),
  computed: {
    billStatus() {
      return this.billStatusMap[this.billDetail.check_status]
    }
  },
  mounted() {
    this.detailId = this.$route.query.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      getDetail({ check_id: this.detailId }).then(res => {
        this.billDetail = res.data.data
        if (this.billDetail.type === '1') {
          this.headerTitle = '充值详情'
          this.billStausTitle = '充值'
        } else {
          this.headerTitle = '提现详情'
          this.billStausTitle = '提现'
        }
      })
    },
    editInvoice() {
      this.$router.replace({
        name: 'applyInvoice',
        query: {
          orderId: this.billDetail.order_number,
          invoiceId: this.billDetail.id,
          type: 'edit'
        }
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
.cancle-apply,.edit-detail {
  display: block;
  margin:3.083rem auto 0;
  width: 20.8333rem;
  height: 3.333rem;
  line-height: 3.333rem;
  border-radius: 1.6667rem;
}
.edit-detail {
  background: #3C51FF;
}
.invoice-price {
  color: #ee0a24;
  font-size: 1.25rem;
}
</style>
