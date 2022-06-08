<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="main">
      <h4>提现流程说明</h4>
      <img src="../../assets/img/user/my/transaction.svg">
      <p>
        用户在充值完本产品后，如需要把金额取出，则需要提供相关的账户信息，录入收款账号后，我们会进行审核并且在1～3个工作进行转账。
      </p>
    </div>
    <div class="main">
      <h4 style="margin-bottom: 1rem">录入首款信息</h4>
      <van-cell-group :border="false">
        <van-field
          v-model="cardNumber"
          type="digit"
          label="收款银行卡号"
          :border="false"
          placeholder="请输入收款银行卡号"
          maxlength="20"
          clearable
        />
        <ul class="card-list" v-if="cardShow">
          <li v-for="item in cardList" :key="item.id" @click="selectCard(item.credit_card)">{{ item.credit_card }}</li>
        </ul>
        <van-field
          v-model="money"
          type="digit"
          label="提现金额"
          :border="false"
          placeholder="请输入提现金额"
          maxlength="9"
          clearable
          @focus="clearCardNum"
        />
        <van-field
          v-model="name"
          label="姓名"
          placeholder="请输入该卡号绑定的姓名"
          :border="false"
          maxlength="10"
          clearable
          @focus="clearCardNum"
        />
      </van-cell-group>
      <van-button type="primary" @click="submit">提现</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { createCheck, getBankCardNumList } from '@/api/check'
export default {
  name: 'RechargeWithdrawal',
  data: () => ({
    headerTitle: '提现',
    cardNumber: '',
    name: '',
    money: '',
    cardList: [],
    cardShow: false
  }),
  watch: {
    cardNumber(value) {
      this.getBankCardNumList(value)
    }
  },
  methods: {
    clearCardNum() {
      this.cardList = []
      this.cardShow = false
    },
    getBankCardNumList(num) {
      if (!num.length) {
        this.clearCardNum()
      } else {
        const params = {
          credit_card: num,
          user_code: localStorage.getItem('userCode')
        }
        getBankCardNumList(params).then(res => {
          const result = res.data.data
          if (result.list && result.list.length) {
            if (num === result.list[0].credit_card) {
              this.clearCardNum()
            } else {
              this.cardList = result.list
              this.cardShow = true
            }
          } else {
            this.clearCardNum()
          }
        })
      }
    },
    selectCard(num) {
      this.cardNumber = num
      this.clearCardNum()
    },
    submit() {
      if (!this.cardNumber.length) {
        Toast('请输入收款银行卡号')
      } else if (this.cardNumber.length < 16) {
        Toast('收款银行卡号长度不对')
      } else if (!this.name.length) {
        Toast('请输入姓名')
      } else if (!this.money.length || Number(this.money) === 0) {
        Toast('请输入不为0的提现金额')
      } else {
        const params = {
          credit_card: this.cardNumber,
          user_code: localStorage.getItem('userCode'),
          money: this.money,
          name: this.name,
          type: '2'
        }
        createCheck(params).then(res => {
          Toast('提交成功')
          this.$router.replace({
            name: 'rechargeResult',
            query: {
              type: 'withdrawal'
            }
          })
        })
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
  padding: 1.167rem 1.25rem 1.5rem 2.083rem;
  position: relative;
  .card-list {
    position: absolute;
    left: 9rem;
    z-index: 999;
    background: #fff;
    width: calc(100% - 13rem);
    border: 1px solid #ebedf0;
    border-top: none;
    li {
      padding: .2rem;
      height: 1.677rem;
      line-height: 1.677rem;
      font-size: 1.167rem;
      &:hover {
        background: #F5F5F6;
      }
    }
  }
  h4 {
    height: 1.667rem;
    font-size: 1.167rem;
    font-weight: 600;
    color: #000;
    line-height: 1.667rem;
    text-align: center;
  }
  img {
    width: 2rem;
    display: block;
    margin: 1.167rem auto;
  }
  p {
    font-size: 1.167rem;
    font-weight: 400;
    color: #000000;
    line-height: 1.667rem;
  }
  .van-cell {
    /deep/ .van-field__label {
      text-align: right;
    }
  }
  .van-button {
    display: block;
    margin:2.5rem auto;
    width: 20.8333rem;
    height: 3.333rem;
    line-height: 3.333rem;
    background: #3C51FF;
    border-color: #3C51FF;
    border-radius: 1.6667rem;
  }
}
</style>
