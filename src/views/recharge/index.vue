<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="main">
      <p>
        <van-icon name="pending-payment" size="1.5rem" />
        我的账户余额
      </p>
      <h4>{{ surplusMoney }}元</h4>
      <van-row>
        <van-col span="12">
          <button class="recharge-button" @click="handleRecharge">充值</button>
          <button class="recharge-button recharge-button1" @click="handWithdrawal">提现</button>
        </van-col>
        <van-col span="12">
          <h5>
            <span @click="getHistoryBill">查看历史账单</span>
            <span> / </span>
            <span @click="handWithdrawalList">提现记录</span>
          </h5>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getUserAccount } from '@/api/user'
export default {
  name: 'Recharge',
  data: () => ({
    headerTitle: '平台账户',
    paymentIndex: 0,
    surplusMoney: '0.00'
  }),
  mounted() {
    this.getUserAccount()
  },
  methods: {
    handleRecharge() {
      this.$router.push('/recharge-explain')
    },
    getUserAccount() {
      const userCode = localStorage.getItem('userCode')
      getUserAccount({ user_code: userCode }).then(res => {
        this.surplusMoney = res.data.data.surplus_money
      })
    },
    getHistoryBill() {
      this.$router.push('/history-bill')
    },
    handWithdrawalList() {
      this.$router.push('/recharge-withdrawalList')
    },
    handWithdrawal() {
      this.$router.push('/recharge-withdrawal')
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
    border: 1px solid #5269ff;
    border-radius: 1.25rem;
    outline: none;
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
  .recharge-button1 {
    background: #fff;
    border: 1px solid #5269ff;
    color: #5269ff;
    margin-left: 5px;
  }
}
</style>
