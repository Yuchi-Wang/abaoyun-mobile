<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group v-if="userType === '1'">
      <van-cell title="发票类型" :border="false" value="增值税普通发票" />
      <van-cell title="用户类型" :border="false" value="个人用户" />
      <van-field v-model="invoiceDetail.invoice_title" label="发票抬头" :border="false" placeholder="请填写需要开具发票的姓名" maxlength="10" input-align="right" />
      <van-field v-model="invoiceDetail.mailing_address" label="邮寄地址" :border="false" placeholder="请填写需要开具发票的邮寄地址" maxlength="50" input-align="right" />
      <van-cell v-if="invoiceDetail.invoice_amount" title="开票金额">
        <template #right-icon>
          <span class="invoice-price">
            ￥{{ invoiceDetail.invoice_amount.toFixed(2) }}
            </span>
          </template>
      </van-cell>
      <van-cell title="发票内容" value="明细" />
    </van-cell-group>
    <van-cell-group v-if="userType === '2'">
      <van-cell title="发票类型" :border="false" value="增值税普通发票" />
      <van-cell title="用户类型" :border="false" value="企业用户" />
      <van-field v-model="invoiceDetail.invoice_title" label="发票抬头" :border="false" placeholder="请填写需要开具发票的企业名称" maxlength="20" input-align="right" />
      <van-field v-model="invoiceDetail.duty_paragraph" label="税务登记号" :border="false" placeholder="纳税人识别号" input-align="right" maxlength="20" />
      <van-field v-model="invoiceDetail.deposit_bank" label="开户银行" :border="false" placeholder="选填" input-align="right" maxlength="20" />
      <van-field v-model="invoiceDetail.bank_account" label="银行账号" :border="false" placeholder="选填" input-align="right" maxlength="20" />
      <van-field v-model="invoiceDetail.company_adress" label="企业地址" :border="false" placeholder="选填" input-align="right" maxlength="50" />
      <van-field v-model="invoiceDetail.company_phone" label="企业电话" :border="false" placeholder="选填" input-align="right" maxlength="15" />
      <van-field v-model="invoiceDetail.mailing_address" label="邮寄地址" :border="false" placeholder="请填写需要开具发票的邮寄地址" input-align="right" />
      <van-cell v-if="invoiceDetail.invoice_amount" title="开票金额">
        <template #right-icon>
          <span class="invoice-price">
            ￥{{ invoiceDetail.invoice_amount.toFixed(2) }}
          </span>
        </template>
      </van-cell>
      <van-cell title="发票内容" value="明细" />
    </van-cell-group>
    <van-button v-if="userType" type="info" :loading="applyLoading" @click="submit">确  认</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { createInvoice, updateInvoice, getDetail } from '@/api/invoice'
import { getDetail as getOrderDetail } from '@/api/order'
import { getUserInfo } from '@/api/user'
export default {
  name: 'ApplyInvoice',
  data: () => ({
    detailId: -1,
    headerTitle: '',
    value: '',
    applyLoading: false,
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
    },
    oldDetail: {},
    userType: ''
  }),
  mounted() {
    this.init()
    this.getPersonal()
    this.getOrderDetail()
  },
  methods: {
    init() {
      this.invoiceDetail.order_number = this.$route.query.orderId
      if (this.$route.query.type === 'apply') {
        this.headerTitle = '申请开票'
      } else if (this.$route.query.type === 'again-apply') {
        this.headerTitle = '申请开票'
        this.getDetail()
      } else if (this.$route.query.type === 'edit') {
        this.headerTitle = '修改开票'
        this.getDetail()
      }
    },
    getPersonal() {
      const params = {
        user_code: localStorage.getItem('userCode')
      }
      getUserInfo(params).then(response => {
        this.userType = response.data.data.user_type
      })
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
        const resultData = res.data.data
        this.$route.query.type === 'edit' ? this.invoiceDetail = resultData : this.oldDetail = resultData
        this.userType = this.invoiceDetail.invoice_type + ''
      })
    },
    submit() {
      this.invoiceDetail.invoice_type = Number(this.userType)
      this.invoiceDetail.status = '1'
      if (!this.invoiceDetail.invoice_title.length) {
        Toast('发票抬头不能为空')
      } else if (!this.invoiceDetail.mailing_address.length) {
        Toast('邮寄地址不能为空')
      } else {
        // 企业
        if (this.invoiceDetail.invoice_type === 2) {
          if (!this.invoiceDetail.duty_paragraph.length) {
            Toast('税务登记号不能为空')
          } else if (this.invoiceDetail.duty_paragraph.length < 15) {
            Toast('税务登记号长度不对')
          } else {
            this.applyInvoice()
          }
        } else if (this.invoiceDetail.invoice_type === 1) {
          // 个人
          this.applyInvoice()
        }
      }
    },
    applyInvoice() {
      if (this.$route.query.invoiceId && this.$route.query.type === 'edit') {
        this.createOrUpdateInvoice(updateInvoice, '修改成功')
      } else if (this.$route.query.type === 'apply') {
        this.createOrUpdateInvoice(createInvoice, '已发起申请')
      } else if (this.$route.query.type === 'again-apply') {
        this.againApply()
      }
    },
    againApply() {
      this.applyLoading = true
      this.oldDetail.status = 5
      updateInvoice(this.oldDetail).then(res => {
        createInvoice(this.invoiceDetail).then(response => {
          if (response.data.code === 200) {
            Toast('申请成功')
            this.$router.replace('/invoice-list')
          } else {
            this.applyLoading = false
          }
        }).finally(() => {
          this.applyLoading = false
        })
      })
    },
    createOrUpdateInvoice(methods, toastInfo) {
      this.applyLoading = true
      methods(this.invoiceDetail).then(res => {
        if (res.data.code === 200) {
          Toast(toastInfo)
          this.$router.replace('/invoice-list')
        } else {
          this.applyLoading = false
        }
      }).finally(() => {
        this.applyLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group {
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
