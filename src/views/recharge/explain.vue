<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="main">
      <h4>充值付款留流程说明</h4>
      <img src="../../assets/img/user/my/transaction.svg">
      <p>
        你好，订阅平台的支付充值是通过线下进行，我们会提供公司的对公账号给您，对该账号充值完成后，把您的交易完成凭据（截图）
        <span>进行上传</span>
      </p>
      <p style="margin-top: 1rem">
        上传完成后，我们会通过发送消息通知您，请及时查收。
        <span class="important-notice">（交易处理在工作日进行）</span>
      </p>
    </div>
    <div class="main">
      <h4>转账信息</h4>
      <van-row>
        <van-col span="6" class="t-a-l">户名：</van-col>
        <van-col span="16">&nbsp;精诚胜龙信息系统有限公司</van-col>
      </van-row>
      <van-row>
        <van-col span="6" class="t-a-l">账号：</van-col>
        <van-col span="16">&nbsp;3441212312314124123124412</van-col>
      </van-row>
      <van-row>
        <van-col span="6" class="t-a-l">开户行：</van-col>
        <van-col span="16">&nbsp;招商银行徐汇支行</van-col>
      </van-row>
      <van-row>
        <van-col span="6" class="t-a-l">联系电话：</van-col>
        <van-col span="16">&nbsp;021-61266911</van-col>
      </van-row>
      <van-button type="primary" @click="handleUploader">下一步</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RechargeExplain',
  data: () => ({
    headerTitle: '充值交易'
  }),
  methods: {
    handleUploader() {
      this.$router.replace('/recharge-uploader')
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
  .t-a-l {
    text-align: right!important;
  }
  .van-row {
    margin-top: 1.167rem;
  }
  .van-col {
    height: 1.667rem;
    font-size: 1.167rem;
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
    span {
      color: #2229FF;
    }
    .important-notice {
      color: #FF1E1E;
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
