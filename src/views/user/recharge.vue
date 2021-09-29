<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="main">
      <p>
        <van-icon name="pending-payment"  size="1.5rem" />
        我的账户余额
      </p>
      <h4>{{ surplusMoney }}元</h4>
      <van-row>
        <van-col span="12">
          <button class="recharge-button" @click="purchaseShow = true">充值</button>
        </van-col>
        <van-col span="12">
          <h5 @click="getHistoryBill">查看历史账单</h5>
        </van-col>
      </van-row>
    </div>
    <!-- 选择付款方式 -->
    <van-popup v-model="purchaseShow" position="bottom" class="select-set-meal" @click-overlay="resetPayForm">
      <h4>付款方式</h4>
      <van-row gutter="10">
        <van-col v-for="(item, index) in purchaseList" :key="item.id" span="8">
          <span :class="{ active: index === paymentIndex }" @click="selectPayment(index)">{{ item.name }}</span>
        </van-col>
      </van-row>
      <van-field v-model="totalPrice" type="digit" label="充值金额" />
      <van-submit-bar :price="submitPrice"  :loading="submitShow" button-text="提交" @submit="submit" />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getUserAccount, createPayAccount } from '@/api/user'
export default {
  name: 'Recharge',
  data: () => ({
    headerTitle: '平台账户',
    purchaseShow: false,
    purchaseList: [
      {
        id: '1',
        name: '支付宝'
      },
      {
        id: '2',
        name: '微信'
      }
    ],
    paymentIndex: 0,
    payName: '',
    submitShow: false,
    totalPrice: '',
    submitPrice: 0,
    surplusMoney: '0.00'
  }),
  watch: {
    totalPrice(value) {
      this.submitPrice = Number(value) * 100
    }
  },
  mounted() {
    this.getUserAccount()
  },
  methods: {
    submit() {
      const params = {
        money: this.totalPrice + '',
        type: this.paymentIndex + 1 + '',
        user_code: localStorage.getItem('userCode')
      }
      if (this.money !== '') {
        createPayAccount(params).then(res => {
          this.purchaseShow = false
          this.getUserAccount()
          Toast(res.data.msg)
        })
      } else {
        Toast('充值金额不能为空')
      }
    },
    getUserAccount() {
      const userCode = localStorage.getItem('userCode')
      getUserAccount({ user_code: userCode }).then(res => {
        this.surplusMoney = res.data.data.surplus_money
      })
    },
    selectPayment(index) {
      this.paymentIndex = index
    },
    resetPayForm() {
      setTimeout(() => {
        this.paymentIndex = 0
        this.totalPrice = ''
        this.submitPrice = 0
      }, 300)
    },
    getHistoryBill() {
      this.$router.push('/history-bill')
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  border-radius: .667rem;
  margin: .833rem;
  padding: 2.5rem 1.25rem 1.5rem 2.083rem;
  p {
    height: 1.667rem;
    font-size: 1.167rem;
    font-weight: 600;
    color: #323A44;
    line-height: 1.667rem;
    margin-bottom: 1rem;
    .van-icon {
      vertical-align: middle;
      margin-right: .15rem;
    }
  }
  h4 {
    margin-bottom: 1.333rem;
    height: 3.333rem;
    font-size: 2.333rem;
    font-weight: 600;
    color: #5269FF;
    line-height: 3.333rem;
  }
  .recharge-button {
    width: 6.25rem;
    height: 2.5rem;
    line-height: 2.5rem;
    background: #5269FF;
    border-radius: 1.25rem;
    outline: none;
    border: none;
    color: #fff;
    font-size: 1.167rem;
    font-weight: 600;
  }
  h5 {
    text-align: right;
    height: 2.5rem;
    line-height: 2.5rem;
    font-weight: 600;
    color: #5269FF;
  }
}
.select-set-meal {
  padding: 1.25rem 1.5rem 2.5rem;
  box-sizing: border-box;
  text-align: center;
    h4 {
      height: 1.667rem;
      font-size: 1.167rem;
      margin-bottom: 1.25rem;
      font-weight: 400;
      color: #000000;
      line-height: 1.667rem;
      text-align: left;
    }
    .van-row {
      text-align: center;
      .van-col {
      margin-bottom: 1.25rem;
    }
    span {
      display: inline-block;
      width: 100%;
      height: 2.75rem;
      line-height: 2.75rem;
      background: #F2F2F2;
      border-radius: .333rem;
      color: #999;
    }
    .active {
      background: #3C51FF;
      color: #fff;
    }
  }
}
.van-submit-bar {
  position: relative;
  border-top: 1px solid #F2F2F2;
  .van-button {
    width: 8.333rem;
    height: 2.75rem;
    background: #3C51FF;
    border-radius: 1.667rem;
  }
}
</style>
