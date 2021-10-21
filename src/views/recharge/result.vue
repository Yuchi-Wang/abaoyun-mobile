<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="main">
      <h4>交易结果</h4>
      <img src="../../assets/img/user/my/recharge-success.svg">
      <h4>提交成功</h4>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RechargeWithdrawal',
  data: () => ({
    headerTitle: '提现',
    cardNumber: '',
    name: '',
    tel: ''
  }),
  mounted() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  border-radius: .667rem;
  margin: .833rem;
  padding: 1.167rem 1.25rem 1.5rem 2.083rem;
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
