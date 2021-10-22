<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="main">
      <h4>交易结果</h4>
      <img src="../../assets/img/user/my/recharge-success.svg">
      <h4>提交成功</h4>
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RechargeWithdrawal',
  data: () => ({
    headerTitle: '',
    content: ''
  }),
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const type = this.$route.query.type
      if (type === 'withdrawal') {
        this.headerTitle = '提现'
        this.content = '您的收款信息已经提交成功，我们会进行核实，核实时间为一般为1到2个工作日，处理完后会告知您，请及时查看到账情况'
      } else {
        this.headerTitle = '充值'
        this.content = '您的交易凭据已经上传成功，我们会进行核实，核实时间为一般为1到2个工作日，处理完后会告知您，请及时查看到账情况'
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
    margin-top: 2.08rem;
    font-size: 1.17rem;
    font-weight: 400;
    color: #555555;
    line-height: 1.67rem;
  }
}
</style>
