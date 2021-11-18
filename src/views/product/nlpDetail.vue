<template>
  <div class="product-main">
    <baseHeader :header-title="headerTitle" />
    <div class="banner" :style="{backgroundImage: `url(${$imgUrl}${productDetail.imageUrl})`}">
      <h3>
        <span class="san" />
        <span class="part-title">PART01</span><br>
        <span class="main-title">产品简介</span>
      </h3>
      <p>{{ productDetail.descript }}</p>
    </div>
    <div class="case">
      <h3>
        <span class="san" />
        <span class="part-title">PART02</span><br>
        <span class="main-title">产品案例</span>
      </h3>
      <img src="../../assets/img/product/nlp-1.svg" alt="">
      <img src="../../assets/img/product/nlp-2.svg" alt="">
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
        <van-col v-for="item in packgeList" :key="item.id" span="8">
          <div class="price-list-bg">
            <span class="price-type">{{ item.name }}</span>
            <h4>服务量 </h4>
            <p class="times">{{ item.times }}次</p>
            <p class="cost">{{ item.money }}</p>
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
      <van-button round @click="getNlpDoc">技术文档</van-button>
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
      <van-button class="purchase-button" type="info" @click="purchase" :disabled="isDisable">购买</van-button>
    </van-popup>
    <!-- 选择付款方式 -->
    <van-popup v-model="purchaseShow" position="bottom" class="select-set-meal" @click-overlay="resetPayForm">
      <h4>付款方式</h4>
      <van-row gutter="10">
        <van-col span="8">
          <van-button class="active">账户余额</van-button>
        </van-col>
      </van-row>
      <van-submit-bar :price="submitBarPrice" :loading="submitShow" button-text="提交" @submit="submit" />
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
import { Toast } from 'vant'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/api/user'
import { createOrder } from '@/api/order'
import { getDetail, getPackagesList } from '@/api/product'
export default {
  name: 'NlpDetail',
  data: () => ({
    headerTitle: '金融NLP',
    useShow: false,
    purchaseShow: false,
    jarPopup: false,
    advantageList: [
      {
        id: 1,
        src: require('@/assets/img/product/advantage.svg'),
        title: '金融知识库',
        content: '通过专属的智能金融知识库，阿宝可以准确的理解股票金融环境下的特定词意'
      },
      {
        id: 2,
        src: require('@/assets/img/product/advantage.svg'),
        title: '模糊匹配',
        content: '您可以在聊天室进行交易下单，不必跳出聊天室'
      },
      {
        id: 3,
        src: require('@/assets/img/product/advantage.svg'),
        title: '聊天室交易',
        content: '您可以在聊天室进行交易下单，不必跳出聊天室'
      },
      {
        id: 4,
        src: require('@/assets/img/product/advantage.svg'),
        title: '聊天室查询',
        content: '你可以在聊天室查询股票相关信息'
      }
    ],
    packgeList: [],
    activeIndex: 1,
    submitShow: false,
    resultShow: false,
    productDetail: {},
    paymentAmount: 0,
    totalPrice: 0,
    totalTimes: 0,
    submitBarPrice: 0,
    trial_number: 0,
    isDisable: false
  }),
  mounted() {
    this.getProductDetail()
    this.getPersonal()
  },
  methods: {
    getNlpDoc() {
      this.$router.push('/nlp-doc')
    },
    getPersonal() {
      const userToken = getToken()
      if (userToken) {
        const params = {
          user_code: localStorage.getItem('userCode')
        }
        getUserInfo(params).then(res => {
          this.trial_number = res.data.data.trial_number
          this.getPackagesList()
        })
      }
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
    resetPayForm() {
      setTimeout(() => {
        this.activeIndex = 1
        this.totalTimes = 0
        this.totalPrice = 0
        this.submitBarPrice = 0
        this.isDisable = false
      }, 300)
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
    purchase() {
      this.totalPrice = Number(this.packgeList[this.activeIndex].money)
      this.submitBarPrice = this.totalPrice * 100
      this.totalTimes = this.packgeList[this.activeIndex].times
      this.useShow = false
      this.purchaseShow = true
    },
    submit() {
      this.submitShow = true
      const orderParams = {
        product_name: '金融NLP',
        price_number: this.productDetail.price,
        payment_amount: this.totalPrice + '',
        payment_type: '3',
        order_status: '1',
        phone: '',
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
    background-repeat: no-repeat;
    background-size: cover;
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
      margin: 4.833rem auto 3rem;
      z-index: 5;
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
      line-height: 1.5rem;
    }
  }
  .case {
    margin-top: 18.5rem;
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
      z-index: 5;
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
    }
  }
  .advantage {
    background: #fff;
    padding-top: 1.583rem;
    h3 {
      position: relative;
      margin: 0 auto 2.5rem;
      width: 6rem;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
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
          font-size: 1rem;
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
      height: 22.167rem;
      z-index: 1;
      padding: 1.5883rem 3.1667rem 0;
      box-sizing: border-box;
      h3 {
        position: relative;
        margin: 0 auto 2rem;
        width: 6rem;
        font-size: 1.167rem;
        font-weight: 600;
        color: #fff;
        line-height: 1.667rem;
        text-align: center;
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
      margin: 0 auto 3rem;
      width: 6rem;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
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
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
      position: relative;
      margin: 0 auto 3rem;
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
        height: 2.75rem;
        line-height: 2.75rem;
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
