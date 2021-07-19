<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-tabs
      v-model="active"
      swipeable
      color="#3C51FF"
      title-active-color="#3C51FF"
      @change="handleChange"
    >
      <van-tab title="个人">
        <van-cell-group>
          <van-cell title="发票类型" :border="false" value="增值税普通发票" />
          <van-field v-model="invoice.name" label="发票抬头" :border="false" placeholder="请填写需要开具发票的姓名" input-align="right" />
          <van-field v-model="invoice.adress" label="邮寄地址" :border="false" placeholder="请填写需要开具发票的邮寄地址" input-align="right" />
          <van-cell title="开票金额">
            <template #right-icon>
              <span class="invoice-price">
                ￥5000.00
              </span>
            </template>
          </van-cell>
          <van-cell title="发票内容" value="明细" />
        </van-cell-group>
      </van-tab>
      <van-tab title="企业">
        <van-cell-group>
          <van-cell title="发票类型" :border="false" value="增值税普通发票" />
          <van-field v-model="invoice.name" label="发票抬头" :border="false" placeholder="请填写需要开具发票的企业名称" input-align="right" />
          <van-field v-model="invoice.identification" label="税务登记号" :border="false" placeholder="纳税人识别号" input-align="right" />
          <van-field v-model="invoice.bank" label="开户银行" :border="false" placeholder="选填" input-align="right" />
          <van-field v-model="invoice.bankNum" label="银行账号" :border="false" placeholder="选填" input-align="right" />
          <van-field v-model="invoice.companyAddress" label="企业地址" :border="false" placeholder="选填" input-align="right" />
          <van-field v-model="invoice.companyPhone" label="企业电话" :border="false" placeholder="选填" input-align="right" />
          <van-field v-model="invoice.adress" label="邮寄地址" :border="false" placeholder="请填写需要开具发票的邮寄地址" input-align="right" />
          <van-cell title="开票金额">
            <template #right-icon>
              <span class="invoice-price">
                ￥5000.00
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
export default {
  name: 'ApplyInvoice',
  data: () => ({
    detailId: -1,
    headerTitle: '',
    active: 0,
    value: '',
    invoice: {
      name: '',
      adress: '',
      identification: '',
      bank: '',
      bankNum: '',
      companyAddress: '',
      companyPhone: ''
    }
  }),
  mounted() {
    if (this.$route.query.type === 'apply') {
      this.headerTitle = '申请开票'
    } else if (this.$route.query.type === 'edit') {
      this.headerTitle = '修改开票'
    }
  },
  methods: {
    handleChange() {
      for (const key in this.invoice) {
        this.invoice[key] = ''
      }
    },
    applyInvoice() {
      if (!this.invoice.name.length) {
        Toast('发票抬头不能为空')
      } else if (!this.invoice.adress.length) {
        Toast('邮寄地址不能为空')
      } else if (this.active && !this.invoice.identification.length) {
        Toast('纳税人识别号不能为空')
      } else {
        Toast('申请成功!')
        this.$router.replace('/invoice-list')
      }
    }
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
