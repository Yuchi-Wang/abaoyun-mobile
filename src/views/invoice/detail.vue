<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-cell title="发票状态" :border="false" :value="invoiceStatus" />
      <van-cell v-if="invoiceDetail.status === '4'" title="拒绝理由" :border="false" :value="invoiceDetail.reason" />
      <van-cell title="发票类型" :border="false" :value="invoiceDetail.invoice_type ? '企业' : '个人'" />
      <van-cell title="发票抬头" :border="false" :value="invoiceDetail.invoice_title" />
      <van-cell title="邮寄地址" :border="false" :value="invoiceDetail.mailing_address" />
      <van-cell v-if="invoiceDetail.invoice_type && invoiceDetail.duty_paragraph" title="税务登记号" :border="false" :value="invoiceDetail.duty_paragraph" />
      <van-cell v-if="invoiceDetail.invoice_type && invoiceDetail.deposit_bank" title="开户银行" :border="false" :value="invoiceDetail.deposit_bank" />
      <van-cell v-if="invoiceDetail.invoice_type && invoiceDetail.bank_account" title="银行账号" :border="false" :value="invoiceDetail.bank_account" />
      <van-cell v-if="invoiceDetail.invoice_type && invoiceDetail.company_adress" title="企业地址" :border="false" :value="invoiceDetail.company_adress" />
      <van-cell v-if="invoiceDetail.invoice_type && invoiceDetail.company_phone" title="企业电话" :border="false" :value="invoiceDetail.company_phone" />
      <van-cell v-if="invoiceDetail.invoice_amount" title="开票金额">
        <template #right-icon>
          <span class="invoice-price">
            {{ invoiceDetail.invoice_amount.toFixed(2) }}
          </span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-button v-if="invoiceDetail.status === '1'" class="cancle-apply" @click="cancleInvoice">撤销申请</van-button>
    <van-button v-if="invoiceDetail.status === '1' || invoiceDetail.status === '4'" class="edit-detail" type="info" @click="editInvoice">修改申请</van-button>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { getDetail, updateInvoice } from '@/api/invoice'
const invoiceStatusMap = {
  '1': '已申请',
  '2': '申请成功',
  '3': '已撤销',
  '4': '申请失败'
}
export default {
  name: 'InvoiceDetail',
  data: () => ({
    detailId: -1,
    headerTitle: '发票详情',
    invoiceDetail: {},
    invoiceStatusMap
  }),
  computed: {
    invoiceStatus() {
      return this.invoiceStatusMap[this.invoiceDetail.status]
    }
  },
  mounted() {
    this.detailId = this.$route.query.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      getDetail({ id: this.detailId }).then(res => {
        this.invoiceDetail = res.data.data
      })
    },
    editInvoice() {
      this.$router.replace({
        name: 'applyInvoice',
        query: {
          orderId: this.invoiceDetail.order_number,
          invoiceId: this.invoiceDetail.id,
          type: 'edit'
        }
      })
    },
    cancleInvoice() {
      Dialog.confirm({
        message: '确认取消申请该该发票吗'
      }).then(() => {
        this.invoiceDetail.status = '3'
        updateInvoice(this.invoiceDetail).then(res => {
          Toast(res.data.msg)
          this.$router.replace('/invoice-list')
        })
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
