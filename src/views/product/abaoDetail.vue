<template>
  <div class="product-main">
    <baseHeader :header-title="headerTitle" />
    <div class="banner">
      <h3>
        <span class="san" />
        <span class="part-title">PART01</span><br>
        <span class="main-title">产品简介</span>
      </h3>
      <p>
        阿宝是精诚胜龙利用人工智能技术打造的便捷、快速、智能的证券投资交易平台。
        <br>
        <br>
        阿宝利用语音识别、语音合成、NLP语义解析、声纹认证、人脸识别等AI技术，让阿宝实现“能听、会说、懂你”式的证券投资交易平台。
      </p>
    </div>
    <!-- <div class="experience">
      <div>
        <h3>
          <span class="san" />
          <span class="part-title">PART02</span><br>
          <span class="main-title">产品体验</span>
        </h3>
        <img src="../../assets/img/product/abao-experience.svg" @click="handleExperience">
      </div>
    </div> -->
    <div class="experience">
      <h3>
        <span class="san" />
        <span class="part-title">PART02</span><br>
        <span class="main-title">产品案例</span>
      </h3>
      <img src="../../assets/img/product/abo-detail-1.svg" alt="">
      <img src="../../assets/img/product/abo-detail-2.svg" alt="">
      <img src="../../assets/img/product/abo-detail-3.svg" alt="">
    </div>
    <div class="advantage">
      <h3>
        <span class="san" />
        <span class="part-title">PART03</span><br>
        <span class="main-title">产品优势</span>
      </h3>
      <ul>
        <li v-for="item in advantageList" :key="item.id">
          <h4>
            <i />
            {{ item.title }}
          </h4>
          <p>{{ item.content }}</p>
        </li>
      </ul>
    </div>
    <div class="scene">
      <div class="scene-banner">
        <h3>
          <span class="san" />
          <span class="part-title">PART04</span><br>
          <span class="main-title">应用场景</span>
        </h3>
        <h4>智能语音交互</h4>
        <p style=" margin-bottom: 3rem;">
          相比传统的交易模式，聊天室下单方式可以给您多一种交易途径、例如开车。
        </p>
        <h4>自然语言处理</h4>
        <p>
          阿宝可以通过自然语言处理技术，把您表述内容的意图和金融知识库匹配分析；当您出现表述错误的时候，它也可以快速的理解您的意图给出正确反馈。
        </p>
      </div>
    </div>
    <div class="price">
      <h3>
        <span class="san" />
        <span class="part-title">PART05</span><br>
        <span class="main-title">产品定价</span>
      </h3>
      <van-row>
        <van-col v-for="(item, index) in packgeList" :key="item.id" span="8">
          <div class="price-list-bg" @click="getPirce(index)">
            <span class="price-type">{{ item.name }}</span>
            <h4>服务量 </h4>
            <p class="times">{{ item.times }}次</p>
            <p class="cost">￥{{ item.money }}</p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="resources">
      <h3>
        <span class="san" />
        <span class="part-title">PART06</span><br>
        <span class="main-title">相关资源</span>
      </h3>
      <van-button round @click="getAbaoDoc">技术文档</van-button>
    </div>
    <footer>
      <van-button round type="info" @click="freeUse">购买</van-button>
    </footer>
    <!-- 选择套餐 -->
    <van-popup v-model="useShow" position="bottom" class="select-set-meal" @click-overlay="resetPayForm">
      <h4>选择套餐</h4>
      <van-row gutter="10">
        <van-col v-for="(item, index) in packgeList" :key="item.id" span="8">
          <van-button :class="{ active: index === activeIndex }" @click="select(index)">{{ item.name }}</van-button>
        </van-col>
      </van-row>
      <p v-if="isDisable" class="disable-tip">您已申请过免费试用</p>
      <van-button class="purchase-button" type="info" :disabled="isDisable" @click="purchase">购买</van-button>
    </van-popup>
    <!-- 选择付款方式 -->
    <van-popup v-model="purchaseShow" position="bottom" class="select-set-meal" @click-overlay="resetPayForm">
      <van-field v-if="!paymentIndex" v-model="paymentPwd" type="password" label="支付密码：" maxlength="16" class="pwd-input" placeholder="请输入当前支付密码" />
      <p v-if="!paymentIndex" class="fotgot-or-set-pwd">
        <span v-if="isHasPaymentPwd" style="text-align: right" @click="forgotPwd">忘记密码？</span>
        <span v-else style="text-align: left">当前账户未设置支付密码，<i @click="setPaymentPwd">请点击设置</i></span>
      </p>
      <van-row gutter="10">
        <van-col span="6">
          <h4 style="line-height:2.5rem">付款方式：</h4>
        </van-col>
        <van-col v-if="activeIndex === 0" span="8">
          <van-button class="active">账户余额</van-button>
        </van-col>
        <van-col v-else span="8" v-for="(item, index) in paymentList" :key="item.id">
          <van-button :class="{ active: index === paymentIndex }" @click="selectPay(index)">{{ item.paymentWay }}</van-button>
        </van-col>
      </van-row>
      <van-checkbox v-model="checked" icon-size="1.147rem" class="policy">
        我已阅读并同意<span @click="agreePolicy">《产品使用协议》</span>
      </van-checkbox>
      <van-submit-bar :disabled="agreeDisable" :price="submitBarPrice" :loading="submitShow" button-text="提交" @submit="submit" />
    </van-popup>
    <!-- 支付结果页 -->
    <van-popup v-model="resultShow" position="bottom" class="pay-result" @click-overlay="resetPayForm">
      <h4>支付成功</h4>
      <van-icon name="passed" />
      <div class="account-area">
        <p>
          支付金额：
          <span>￥{{ totalPrice }}</span>
        </p>
        <p>付款方式：账户余额</p>
      </div>
      <van-button type="info" @click="jarDownLoad">jar包下载</van-button>
    </van-popup>
    <!-- jar包 -->
    <van-popup v-model="jarPopup" class="jar-popup">
      <h3>jar包地址</h3>
      <p>http://www.baidu.com</p>
    </van-popup>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/api/user'
import { createOrder } from '@/api/order'
import { weChatH5Pay } from '@/api/payment'
import { getDetail, getPackagesList } from '@/api/product'
export default {
  name: 'AbaoDetail',
  data: () => ({
    headerTitle: '阿宝产品',
    useShow: false,
    purchaseShow: false,
    jarPopup: false,
    advantageList: [
      {
        id: 1,
        src: require('@/assets/img/product/advantage.svg'),
        title: '聊天室交易',
        content: '您可以在聊天室进行交易下单，不必跳出聊天室'
      },
      {
        id: 2,
        src: require('@/assets/img/product/advantage.svg'),
        title: '智能语音',
        content: '您可以通过语音的聊天形式和阿宝进行交互'
      },
      {
        id: 3,
        src: require('@/assets/img/product/advantage.svg'),
        title: '智能金融知识库',
        content: '通过专属的智能金融知识库，阿宝可以准确的理解股票金融环境下的特定词意'
      },
      {
        id: 4,
        src: require('@/assets/img/product/advantage.svg'),
        title: '自然语言交易',
        content: '您可以通过语音形式进行下单'
      }
    ],
    packgeList: [],
    paymentList: [
      {
        id: 1,
        paymentWay: '账户余额'
      },
      {
        id: 2,
        paymentWay: '微信支付'
      }
    ],
    paymentIndex: 0,
    activeIndex: 1,
    submitShow: false,
    resultShow: false,
    productDetail: {},
    paymentAmount: 0,
    totalPrice: 0,
    totalTimes: 0,
    submitBarPrice: 0,
    trial_number: 0,
    isDisable: false,
    agreeDisable: true,
    checked: false,
    paymentPwd: '',
    isHasPaymentPwd: false
  }),
  watch: {
    checked(value) {
      if (value) {
        this.agreeDisable = false
      } else {
        this.agreeDisable = true
      }
    }
  },
  activated() {
    if (this.$fromUrl.name === 'applyContract' || this.$fromUrl.name === 'rechargeResult') {
      const orderParams = JSON.parse(localStorage.getItem('orderParams'))
      this.productDetail.price = orderParams.price
      this.totalPrice = orderParams.totalPrice
      this.submitBarPrice = orderParams.submitBarPrice
      this.totalTimes = orderParams.totalTimes + ''
      this.useShow = false
      this.purchaseShow = true
      this.paymentPwd = ''
    }
  },
  mounted() {
    this.getPersonal()
    this.getPackagesList()
    this.getProductDetail()
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'applyContract' || to.name === 'rechargeExplain') {
      if (!from.meta.keepAlive) {
        from.meta.keepAlive = true
      }
      const orderParams = {
        totalPrice: Number(this.packgeList[this.activeIndex].money),
        price: this.productDetail.price,
        totalTimes: this.totalTimes,
        submitBarPrice: this.totalPrice * 100
      }
      localStorage.setItem('orderParams', JSON.stringify(orderParams))
      next()
    } else {
      from.meta.keepAlive = false
      to.meta.keepAlive = false
      localStorage.removeItem('orderParams')
      next()
    }
  },
  methods: {
    getAbaoDoc() {
      window.open(`${window.location.protocol}//${window.location.host}/docs/#/`)
    },
    agreePolicy() {
      this.$router.push({
        name: 'applyContract',
        query: {
          id: this.$route.query.id
        }
      })
    },
    getPirce(index) {
      this.freeUse()
      this.select(index)
    },
    selectPay(index) {
      this.paymentIndex = index
    },
    forgotPwd() {
      this.$router.push({
        name: 'forgotPaymentPwd',
        query: { redirect: this.$router.currentRoute.fullPath }
      })
    },
    getPersonal() {
      const userToken = getToken()
      if (userToken) {
        const params = {
          user_code: localStorage.getItem('userCode')
        }
        getUserInfo(params).then(res => {
          this.trial_number = res.data.data.trial_number
          this.trial_number <= 0 ? this.activeIndex = 1 : this.activeIndex = 0
          this.isHasPaymentPwd = !!res.data.data.payment_code
          // this.getPackagesList()
        })
      }
    },
    resetPayForm() {
      setTimeout(() => {
        this.activeIndex = this.trial_number <= 0 ? 1 : 0
        this.totalTimes = 0
        this.totalPrice = 0
        this.submitBarPrice = 0
        this.paymentPwd = ''
        this.isDisable = false
        this.agreeDisable = true
        this.checked = false
      }, 300)
    },
    getPackagesList() {
      const params = {
        type: '1',
        pageIndex: 1,
        pageSize: 8
      }
      getPackagesList(params).then(res => {
        this.packgeList = res.data.data.list.map(item => {
          return {
            name: item.name,
            times: item.times,
            money: item.money
          }
        })
      })
    },
    getProductDetail() {
      getDetail({
        product_Id: this.$route.query.id
      }).then(res => {
        this.productDetail = res.data.data
      })
    },
    select(index) {
      this.activeIndex = index
      if (this.activeIndex === 0) {
        if (this.trial_number <= 0) {
          this.isDisable = true
        } else {
          this.isDisable = false
        }
      } else {
        this.isDisable = false
      }
    },
    handleExperience() {
      this.$router.push('/chat-room')
    },
    freeUse() {
      const userToken = getToken()
      if (userToken !== null) {
        this.useShow = true
      } else {
        Toast('您好，请先登录')
        setTimeout(() => {
          this.$router.replace('/login')
        }, 300)
      }
    },
    purchase() {
      this.totalPrice = Number(this.packgeList[this.activeIndex].money)
      this.submitBarPrice = this.totalPrice * 100
      this.totalTimes = this.packgeList[this.activeIndex].times
      this.useShow = false
      this.purchaseShow = true
    },
    setPaymentPwd() {
      this.$router.push({
        name: 'editpaymentPwd',
        query: {
          operation: 'set'
        }
      })
    },
    submit() {
      if (this.paymentIndex === 0) {
        this.balancePay()
      } else if (this.paymentIndex === 1) {
        this.weChatPay()
      }
    },
    weChatPay() {
      const orderParams = {
        product_name: '诚龙阿宝',
        product_id: this.$route.query.id,
        user_code: localStorage.getItem('userCode'),
        buy_num: this.totalTimes + '',
        total_amount: this.totalPrice + ''
      }
      weChatH5Pay(orderParams).then(res => {
        window.location.href = res.data.data.weChat_url
      })
    },
    balancePay() {
      this.submitShow = true
      const orderParams = {
        product_name: '诚龙阿宝',
        price_number: this.productDetail.price,
        payment_amount: this.totalPrice + '',
        payment_type: '4',
        phone: '',
        payment_code: this.paymentPwd,
        order_status: '1',
        user_code: localStorage.getItem('userCode'),
        product_id: this.$route.query.id,
        buy_num: this.totalTimes + '',
        totalcount: 1
      }
      createOrder(orderParams).then(res => {
        if (res.data.code === 200) {
          this.purchaseShow = false
          this.resultShow = true
          setTimeout(() => {
            this.resetPayForm()
            this.$router.push('/order-list')
          }, 2000)
        } else {
          if (res.data.code === 500 && res.data.msg === '金额不足，请及时充值') {
            Dialog.confirm({
              title: '余额不足提醒',
              message: '当前余额不足，是否充值？'
            }).then(() => {
              this.$router.push('/recharge-explain')
            }).catch(() => {
              // on cancel
            })
          }
          this.submitShow = false
        }
      }).catch(() => {
        this.submitShow = false
      })
    },
    jarDownLoad() {
      this.resultShow = false
      this.jarPopup = true
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-router {
  background: #fff;
}
.product-main {
  /deep/ .base-header {
    background: transparent!important;
    position: relative;
    z-index: 2;
    h3 {
      color: #fff;
    }
    .turn-back-icon {
      border-color: #fff
    }
  }
  .part-title {
    position: relative;
    z-index: 10;
  }
  .main-title {
    position: relative;
    z-index: 5;
  }
  .banner {
    background: url('../../assets/img/product/abao-detail-banner.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    width: 100%;
    height: 22.167rem;
    z-index: 1;
    padding: 0 3.1667rem;
    box-sizing: border-box;
    h3 {
      position: relative;
      font-size: 1.167rem;
      font-weight: 600;
      color: #fff;
      line-height: 1.667rem;
      text-align: center;
      width: 6rem;
      margin: 4rem auto 3rem;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        left: 0;
        top: .5rem;
      }
      .part-title {
        height: 1.667rem;
        line-height: 1.667rem;
      }
    }
    p {
      margin-top: 2rem;
      font-size: 1rem;
      font-weight: 400;
      color: #FFF;
      line-height: 1.4167rem;
    }
  }
  .experience {
    margin-top: 18.5rem;
    width: 100%;
    background: #fff;
    padding: 1.667rem 0 0 0;
    text-align: center;
    box-sizing: border-box;
    h3 {
      position: relative;
      margin: 0 auto 1.667rem;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
      width: 6rem;
      z-index: 3;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        left: 0;
        top: .5rem;
      }
      .part-title {
        color: #0008FF;
      }
    }
    img {
      width: 100%;
      padding-bottom: 1rem;
      margin-top: 1rem;
    }
  }
  .case {
    padding-top: 1.667rem;
    background: #f4f4f4;
    h3 {
      position: relative;
      margin: 0 auto 2rem;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
      width: 6rem;
      z-index: 3;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        vertical-align: top;
        left: 0;
        top: .5rem;
      }
      .part-title {
        color: #0008FF;
      }
    }
    img {
      width: 100%;
    }
  }
  .advantage {
    background: #fff;
    padding-top: 1.583rem;
    h3 {
      position: relative;
      margin: 0 auto 2.667rem;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
      width: 6rem;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        left: 0;
        top: .5rem;
      }
      .part-title {
        color: #0008FF;
      }
    }
    ul {
      li {
        padding: 1.333rem 2.8333rem 1.333rem 2.583rem;
        &:nth-of-type(odd) {
          background: #F7F7F7;
        }
        h4 {
          height: 1.4167rem;
          line-height: 1.4167rem;
          margin-bottom: .833rem;
          font-size: 1rem;
          font-weight: 600;
          color: #000;
          i {
            display: inline-block;
            background: url('../../assets/img/product/advantage.svg') no-repeat;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: .5rem;
            z-index: 1;
            background-size: contain;
            vertical-align: middle;
          }
        }
        p {
          font-weight: 400;
          color: #000;
          line-height: 1.4167rem;
        }
      }
    }
  }
  .scene {
    .scene-banner {
      background: url('../../assets/img/product/nlp-detail-banner.jpg') no-repeat;
      background-size: cover;
      width: 100%;
      height: 25rem;
      z-index: 1;
      padding: 1.5883rem 3.1667rem 0;
      box-sizing: border-box;
      h3 {
        position: relative;
        width: 6rem;
        font-size: 1.167rem;
        font-weight: 600;
        color: #fff;
        line-height: 1.667rem;
        text-align: center;
        margin: 0 auto 2rem;
        .san {
          position: absolute;
          background: url('../../assets/img/product/san.svg') no-repeat;
          width: 6rem;
          height: 6rem;
          z-index: 1;
          background-size: contain;
          left: 0;
          top: .5rem;
        }
      }
      h4 {
        margin-bottom: .833rem;
        height: 1.4167rem;
        line-height: 1.4167rem;
        font-size: 1rem;
        font-weight: 600;
        color: #FFFFFF;
      }
      p {
        font-size: 1rem;
        font-weight: 400;
        color: #FFF;
        line-height: 1.4167rem;
      }
    }
  }
  .price {
    padding: 1.667rem 1.333rem 3.167rem 1.333rem;
    background: #fff;
     h3 {
      position: relative;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
      margin: 0 auto 4.5rem;
      width: 6rem;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        left: 0;
        top: .5rem;
      }
      .part-title {
        color: #0008FF;
      }
    }
    .van-row {
      .price-list-bg {
        position: relative;
        width: 100%;
        padding: 2rem 0 0 .5rem;
        margin-bottom: 1rem;
        height: 10.667rem;
        background: url('../../assets/img/product/cost-bg.svg');
        background-repeat: no-repeat;
        background-size: cover;
        box-sizing: border-box;
        .price-type {
          position: absolute;
          color: #fff;
          font-size: 1rem;
          transform: scale(.833, .833);
          top: .3rem;
          right: 1rem;
        }
        h4 {
          color: #fff;
          font-size: 1rem;
          transform: scale(.833, .833);
        }
        .times {
          height: 1.833rem;
          line-height: 1.833rem;
          font-size: 1.333rem;
          font-weight: 600;
          margin-top: .2rem;
          margin-left: .6rem;
          color: #fff;
        }
        .validity {
          margin-top: .75rem;
          font-size: 1rem;
          color: #fff;
          transform: scale(.833, .833);
        }
        .cost {
          margin-top: 1.333rem;
          color: #fff;
          height: 1.667rem;
          font-size: 1.4167rem;
          margin-left: .6rem;
        }
      }
    }
  }
  .resources {
    text-align: center;
    padding-top: 1.667rem;
    padding-bottom: 10rem;
    padding-left: 1.333rem;
    padding-right: 1.333rem;
    background: #fff;
    border-top: 1px dashed #E6E6E6;
    h3 {
      position: relative;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
      margin: 0 auto 3rem;
      width: 6rem;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        left: 0;
        top: .5rem;
      }
      .part-title {
        color: #0008FF;
      }
    }
    .van-button {
      width: 19.083rem;
      height: 3.333rem;
      line-height: 3.333rem;
      background: #F2F3FF;
      border-color: #F2F3FF;
      border-radius: 20px;
      font-weight: 600;
      color: #324BE3;
    }
  }
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6.67rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow:0px 1px 5px rgb(173, 173, 173);
    z-index: 999;
    .van-button {
      width: 14.5883rem;
      height: 2.5rem;
      line-height: 2.5rem;
      background: #3C51FF;
      border-color: #3C51FF;
    }
  }
  .select-set-meal {
    padding: 1.25rem 1.5rem 2.5rem;
    box-sizing: border-box;
    text-align: center;
    .disable-tip {
      color: #666;
    }
    .pwd-input {
      padding: .75rem 0;
      margin-bottom: .5rem;
      &:after {
        left: 0;
        right: 0;
      }
    }
    .fotgot-or-set-pwd {
      margin-bottom: .4rem;
      color: #666;
      span {
        display: block;
      }
      i {
        color: #0008FF;
      }
    }
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
    .van-button {
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      background: #F2F2F2;
      border-radius: .333rem;
      color: #666;
      border-color: #F2F2F2;
      font-size: 1rem;
    }
    .active {
      background: #3C51FF;
      color: #fff;
    }
  }
  .purchase-button {
    width: 20.833rem;
    height: 3.333rem;
    margin-top: 4.75rem;
    line-height: 3.333rem;
    background: #3C51FF;
    border-color: #3C51FF;
    border-radius: 1.667rem;
  }
  .policy {
    span {
      color:#3C51FF;
    }
  }
  .van-submit-bar {
    position: relative;
    border-top: 1px solid #F2F2F2;
    margin-top: .5rem;
    .van-button {
      width: 8.333rem;
      height: 2.75rem;
      background: #3C51FF;
      border-radius: 1.667rem;
    }
  }
}
  .pay-result {
    text-align: center;
    padding: 1.667rem .833rem 2.5rem;
    box-sizing: border-box;
    h4 {
      height: 1.833rem;
      font-size: 1.333rem;
      font-weight: 600;
      color: #000;
      height: 1.833rem;
      margin-bottom: .8rem;
    }
    .van-icon {
      font-size: 3.5rem;
      color: #3C51FF;
      margin-bottom: 2rem;
    }
    .account-area {
      padding: .833rem 0;
      background: #F7F7F7;
      border-radius: .333rem;
      p {
        height: 2rem;
        font-size: 1.1467rem;
        font-weight: 400;
        color: #000000;
        line-height: 2rem;
      }
    }
    .van-button {
      margin-top: 1.667rem;
      width: 9.167rem;
      height: 3.333rem;
      background: #3C51FF;
      border-radius: 1.667rem;
    }
  }
  .jar-popup {
    width: 20rem;
    padding: .75rem;
    h3 {
      position: relative;
      margin-left: 1.167rem;
      height: 1.667rem;
      line-height: 1.667rem;
      font-size: 1.1667rem;
      font-weight: 600;
      color: #000;
      &:after {
        content: "";
        position: absolute;
        width: .333rem;
        height: 1.5rem;
        background: #324BE3;
        left: -.667rem;
        border-radius: .167rem;
      }
    }
    p {
      width: 100%;
      background: #F8F8F8;
      margin-top: .55rem;
      height: 3.5rem;
      line-height: 3.5rem;
      font-size: 1.167rem;
      text-align: center;
    }
  }
}
</style>
