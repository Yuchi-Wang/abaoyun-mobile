<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-tabs
      v-model="active"
      swipeable
      color="#3C51FF"
      title-active-color="#3C51FF"
    >
      <van-tab title="个人">
        <van-cell-group>
          <van-cell title="发票类型" :border="false" value="增值税普通发票" />
          <van-field v-model="invoiceDetail.invoice_title" label="发票抬头" :border="false" placeholder="请填写需要开具发票的姓名" input-align="right" />
          <van-field v-model="invoiceDetail.mailing_address" label="邮寄地址" :border="false" placeholder="请填写需要开具发票的邮寄地址" input-align="right" />
          <van-cell title="开票金额" v-if="invoiceDetail.invoice_amount">
            <template #right-icon>
              <span class="invoice-price">
                ￥{{ invoiceDetail.invoice_amount.toFixed(2) }}
              </span>
            </template>
          </van-cell>
          <van-cell title="发票内容" value="明细" />
        </van-cell-group>
      </van-tab>
      <van-tab title="企业">
        <van-cell-group>
          <van-cell title="发票类型" :border="false" value="增值税普通发票" />
          <van-field v-model="invoiceDetail.invoice_title" label="发票抬头" :border="false" placeholder="请填写需要开具发票的企业名称" input-align="right" />
          <van-field v-model="invoiceDetail.duty_paragraph" label="税务登记号" :border="false" placeholder="纳税人识别号" input-align="right" />
          <van-field v-model="invoiceDetail.deposit_bank" label="开户银行" :border="false" placeholder="选填" input-align="right" />
          <van-field v-model="invoiceDetail.bank_account" label="银行账号" :border="false" placeholder="选填" input-align="right" />
          <van-field v-model="invoiceDetail.company_adress" label="企业地址" :border="false" placeholder="选填" input-align="right" />
          <van-field v-model="invoiceDetail.company_phone" label="企业电话" :border="false" placeholder="选填" input-align="right" />
          <van-field v-model="invoiceDetail.mailing_address" label="邮寄地址" :border="false" placeholder="请填写需要开具发票的邮寄地址" input-align="right" />
          <van-cell title="开票金额" v-if="invoiceDetail.invoice_amount">
            <template #right-icon>
              <span class="invoice-price">
                ￥{{ invoiceDetail.invoice_amount.toFixed(2) }}
              </span>
            </template>
          </van-cell>
          <van-cell title="发票内容" value="明细" />
        </van-cell-group>
      </van-tab>
    </van-tabs>
    <van-button type="info" @click="applyInvoice">确  认</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { createInvoice, updateInvoice, getDetail } from '@/api/invoice'
import { getDetail as getOrderDetail } from '@/api/order'
export default {
  name: 'ApplyInvoice',
  data: () => ({
    detailId: -1,
    headerTitle: '',
    active: 0,
    value: '',
    invoiceDetail: {
      order_number: '',
      invoice_kind: 0,
      invoice_type: 0,
      invoice_title: '',
      invoice_name: '',
      mailing_address: '',
      duty_paragraph: '',
      deposit_bank: '',
      bank_account: '',
      company_adress: '',
      company_phone: '',
      invoice_amount: '',
      user_code: localStorage.getItem('userCode')
    }
  }),
  mounted() {
    this.init()
    this.getOrderDetail()
  },
  methods: {
    init() {
      this.invoiceDetail.order_number = this.$route.query.orderId
      if (this.$route.query.type === 'apply') {
        this.headerTitle = '申请开票'
      } else if (this.$route.query.type === 'edit') {
        this.headerTitle = '修改开票'
        this.getDetail()
      }
    },
    getOrderDetail() {
      this.detailId = this.$route.query.orderId
      getOrderDetail({ order_number: this.detailId }).then(res => {
        this.invoiceDetail.invoice_amount = res.data.data.payment_amount
        this.invoiceDetail.invoice_name = res.data.data.product_name
      })
    },
    getDetail() {
      getDetail({ id: this.$route.query.invoiceId }).then(res => {
        this.invoiceDetail = res.data.data
        this.active = this.invoiceDetail.invoice_type
      })
    },
    applyInvoice() {
      this.invoiceDetail.invoice_type = this.active
      if (!this.invoiceDetail.invoice_title.length) {
        Toast('发票抬头不能为空')
      } else if (!this.invoiceDetail.mailing_address.length) {
        Toast('邮寄地址不能为空')
      } else {
        // 企业
        if (this.active) {
          if (!this.invoiceDetail.duty_paragraph.length) {
            Toast('税务登记号不能为空')
          } else {
            if (this.$route.query.invoiceId) {
              this.createOrUpdateInvoice(updateInvoice, '修改成功')
            } else {
              this.createOrUpdateInvoice(createInvoice, '申请成功')
            }
          }
        } else {
          // 个人
          if (this.$route.query.invoiceId) {
            this.createOrUpdateInvoice(updateInvoice, '修改成功')
          } else {
            this.createOrUpdateInvoice(createInvoice, '申请成功')
          }
        }
      }
    },
    createOrUpdateInvoice(methods, toastInfo) {
      methods(this.invoiceDetail).then(res => {
        Toast(toastInfo)
        this.$router.replace('/invoice-list')
      })
    }
    // createInvoice() {
    //   createInvoice(this.invoiceDetail).then(res => {
    //     Toast('申请成功')
    //     this.$router.replace('/invoice-list')
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.van-tabs {
  margin: .8333rem;
  border-radius: .667rem;
}
.invoice-price {
  color: #ee0a24;
  font-size: 1.25rem;
}
.van-button {
  display: block;
  margin:3.083rem auto 0;
  width: 20.8333rem;
  height: 3.333rem;
  line-height: 3.333rem;
  background: #3C51FF;
  border-radius: 1.6667rem;
}
</style>
