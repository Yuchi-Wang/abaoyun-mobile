<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="main">
      <p>
        <van-icon name="pending-payment" size="1.5rem" />
        我的账户余额
      </p>
      <h4>{{ surplusMoney.toFixed(2) }}元</h4>
      <van-row>
        <van-col span="12">
          <button class="recharge-button" @click="handleRecharge">充值</button>
          <button class="recharge-button recharge-button1" @click="handWithdrawal">提现</button>
        </van-col>
        <van-col span="12">
          <h5>
            <span @click="getHistoryBill">充值记录</span>
            <span> / </span>
            <span @click="handWithdrawalList">提现记录</span>
          </h5>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getUserAccount, getUserInfo } from '@/api/user'
export default {
  name: 'Recharge',
  data: () => ({
    headerTitle: '平台账户',
    paymentIndex: 0,
    surplusMoney: 0,
    user_type: ''
  }),
  mounted() {
    this.getUserAccount()
    this.getUserInfo()
  },
  methods: {
    handleRecharge() {
      if (this.user_type.length) {
        this.$router.push('/recharge-explain')
      } else {
        Toast('您好，此操作需先在个人中心确认个人用户或企业用户')
        setTimeout(() => {
          this.$router.push('/personal-data')
        }, 1000)
      }
    },
    getUserAccount() {
      const userCode = localStorage.getItem('userCode')
      getUserAccount({ user_code: userCode }).then(res => {
        if (res.data.data) {
          this.surplusMoney = res.data.data.surplus_money
        }
      })
    },
    getUserInfo() {
      const params = {
        user_code: localStorage.getItem('userCode')
      }
      getUserInfo(params).then(res => {
        this.user_type = res.data.data.user_type
      })
    },
    getHistoryBill() {
      this.$router.push('/history-bill')
    },
    handWithdrawalList() {
      this.$router.push('/recharge-withdrawalList')
    },
    handWithdrawal() {
      if (this.surplusMoney) {
        this.$router.push('/recharge-withdrawal')
      } else {
        Toast('暂无可提现余额')
      }
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
