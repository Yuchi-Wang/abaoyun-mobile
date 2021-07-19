<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-cell title="发票类型" :border="false" :value="invoiceDetail.type === '1'? '个人': '企业'" />
      <van-cell title="发票抬头" :border="false" :value="invoiceDetail.name" />
      <van-cell title="邮寄地址" :border="false" :value="invoiceDetail.address" />
      <van-cell v-if="invoiceDetail.type === '2'" title="税务登记号" :border="false" :value="invoiceDetail.identification" />
      <van-cell v-if="invoiceDetail.type === '2' && invoiceDetail.bank" title="开户银行" :border="false" :value="invoiceDetail.bank" />
      <van-cell v-if="invoiceDetail.type === '2' && invoiceDetail.bankNum" title="银行账号" :border="false" :value="invoiceDetail.bankNum" />
      <van-cell v-if="invoiceDetail.type === '2' && invoiceDetail.companyAddress" title="企业地址" :border="false" :value="invoiceDetail.companyAddress" />
      <van-cell v-if="invoiceDetail.type === '2' && invoiceDetail.companyPhone" title="企业电话" :border="false" :value="invoiceDetail.companyPhone" />
      <van-cell title="开票金额">
        <template #right-icon>
          <span class="invoice-price">
            ￥5000.00
          </span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-button v-if="invoiceDetail.status === '1'" class="cancle-apply" @click="cancleInvoice">撤销申请</van-button>
    <van-button v-if="invoiceDetail.status === '1'" class="edit-detail" type="info" @click="editInvoice">修改申请</van-button>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
export default {
  name: 'InvoiceDetail',
  data: () => ({
    detailId: -1,
    headerTitle: '发票详情',
    invoiceDetail: {
      id: '1',
      orderId: '2',
      status: '1',
      type: '2',
      num: '111',
      name: 'xxxx',
      address: '上海市宜山路810号',
      cost: '5000',
      identification: '22222',
      bank: '',
      bankNum: '111',
      companyAddress: '',
      companyPhone: ''
    }
  }),
  mounted() {
    this.detailId = this.$route.query.id
  },
  methods: {
    editInvoice() {
      this.$router.replace({
        name: 'applyInvoice',
        query: {
          id: this.invoiceDetail.orderId,
          type: 'edit'
        }
      })
    },
    cancleInvoice() {
      Dialog.confirm({
        message: '确认取消申请该该发票吗'
      }).then(() => {
        Toast('取消成功')
        this.$router.push('/invoice-list')
      }).catch(() => {
        // on cancel
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
