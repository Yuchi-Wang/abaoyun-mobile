<template>
  <div class="home-main">
    <van-swipe :loop="false" class="main-page" :style="{'height': windowsHeight + 'px'}" vertical>
      <van-swipe-item class="first-page">
        <div class="first-banner" :style="{backgroundImage: `url(${$imgUrl}${abaoDetail.imageUrl})`}">
          <van-notice-bar v-if="noticeShow" left-icon="volume-o" background="rgba(0,0,0,.5)" color="#fff" :scrollable="false">
            <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="3000"
              :show-indicators="false"
            >
              <van-swipe-item v-for="item in noticeList" :key="item.id" @click="getNoticeDetail(item.notice_id)">{{ item.title }}</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
          <h4>
            <img src="../../assets/img/home/home-logo.svg">
            阿宝云
          </h4>
          <h3>阿宝是什么?</h3>
          <p>阿宝是协助您进行股票交易的智能AI助手</p>
        </div>
        <div class="page-radius">
          <div class="radius">
            <img src="../../assets/img/home/root.svg">
            <van-button type="info" @click="consultUs">立即咨询</van-button>
          </div>
          <h3 class="main-title">阿宝能做什么?</h3>
          <p>通过金融NLP技术、人脸识别、语音等技术</p>
          <p>摆脱传统的交易模式，在随意、流动的场景进行交易</p>
          <van-button type="info" class="free-use" @click="getAbaoDetail">了解详情</van-button>
        </div>
      </van-swipe-item>
      <van-swipe-item class="second-page">
        <div class="second-banner" :style="{backgroundImage: `url(${$imgUrl}${nlpDetail.imageUrl})`}">
          <h4>
            <img src="../../assets/img/home/home-logo.svg">
            阿宝云
          </h4>
          <h3>金融NLP是什么？</h3>
          <p>
            金融NLP是自然语言技术，通过专业的金融知识库，以及自助学习功能，它可以听懂你、读懂你实现查询、交易等金融软件等操作
          </p>
          <van-row gutter="7">
            <van-col
              v-for="item in functionList"
              :key="item.id"
              span="8"
              @click="getDetail(item.path)"
            >
            <div>
              <p>
                <img :src="item.src">
                {{ item.title }}
              </p>
            </div>
            </van-col>
          </van-row>
        </div>
        <div class="page-radius">
          <div class="radius">
            <img src="../../assets/img/home/nlp.svg">
            <van-button type="info" @click="consultUs">立即咨询</van-button>
          </div>
          <h3>接入方案</h3>
          <van-steps active-icon="success" active-color="#324BE3" inactive-color="#324BE3">
            <van-step>选择服务</van-step>
            <van-step>获取appid</van-step>
            <van-step>获取接口</van-step>
            <van-step>使用NLP</van-step>
          </van-steps>
          <div class="button-area">
            <van-button type="info" class="free-use" @click="getNlpDetail">了解详情</van-button>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-popup v-model="showPopup">
      <h3>咨询电话</h3>
      <p>
        <van-icon name="phone" />
        021-61266911
      </p>
    </van-popup>
  </div>
</template>

<script>
import { getList } from '@/api/product'
import { getList as getNoticeList } from '@/api/notice'
export default {
  name: 'Home',
  data: () => ({
    windowsHeight: document.body.clientHeight,
    functionList: [
      {
        id: 1,
        src: require('@/assets/img/home/dictionaries.svg'),
        title: '金融词库'
      },
      {
        id: 2,
        src: require('@/assets/img/home/scene.svg'),
        title: '多场景'
      },
      {
        id: 3,
        src: require('@/assets/img/home/interactive.svg'),
        title: '人机交互'
      }
    ],
    showPopup: false,
    abaoDetail: '',
    nlpDetail: '',
    noticeList: [],
    noticeShow: false
  }),
  mounted() {
    this.getProductList()
    this.getNoticeList()
  },
  methods: {
    consultUs() {
      this.showPopup = true
    },
    getNoticeList() {
      const params = {
        pageIndex: 1,
        pageSize: 3,
        flag: 1
      }
      getNoticeList(params).then(res => {
        if (res.data.data.list.length) {
          this.noticeShow = true
          this.noticeList = res.data.data.list
        }
      })
    },
    getProductList() {
      const params = {
        pageIndex: 1,
        pageSize: 10
      }
      getList(params).then(res => {
        const productList = res.data.data.list
        this.abaoDetail = productList.find(item => {
          return item.product_name === '阿宝云'
        })
        this.nlpDetail = productList.find(item => {
          return item.product_name === 'nlp'
        })
      })
    },
    getAbaoDetail() {
      this.$router.push({
        name: 'abaoDetail',
        query: {
          id: this.abaoDetail.product_Id
        }
      })
    },
    getNlpDetail() {
      this.$router.push({
        name: 'nlpDetail',
        query: {
          id: this.nlpDetail.product_Id
        }
      })
    },
    getNoticeDetail(id) {
      this.$router.push({
        name: 'noticeDetail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home-main {
  .van-popup {
    width: 20rem;
    padding: .75rem;
    border-radius: .333rem;
    p {
      width: 100%;
      background: #F8F8F8;
      margin-top: .55rem;
      height: 3.5rem;
      line-height: 3.5rem;
      font-size: 1.167rem;
      text-align: center;
      .van-icon {
        color: #324BE3;
        vertical-align: middle;
      }
    }
    h3 {
      position: relative;
      margin-left: 1.167rem;
      height: 1.667rem;
      line-height: 1.667rem;
      font-size: 1.1667rem;
      font-weight: 600;
      color: #000;
      &::after {
        content: "";
        position: absolute;
        width: .333rem;
        height: 1.5rem;
        background: #324BE3;
        left: -.667rem;
        border-radius: .167rem;
      }
    }
  }
  .first-page {
    background: #fff;
    .main-title {
      text-align: center;
      margin: 0 0 2.1667rem;
      font-size: 2rem;
      height: 2.083rem;
      line-height: 2.083rem;
      font-weight: 600;
    }
    .first-banner {
      width: 100%;
      height: 28.25rem;
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;
      padding: 1rem;
      box-sizing: border-box;
      h3 {
        margin-top: 6.5rem;
        line-height: 2.75rem;
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
        color: #FFF;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
      }
      p {
        margin-top: 2.333rem;
        line-height: 1.667rem;
        font-size: 1.167rem;
        font-weight: 400;
        color: #FFF;
      }
      h4 {
        color: #fff;
        font-weight: 400;
        font-size: 1.167rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
        img {
          vertical-align: text-top;
        }
      }
    }
    p {
      text-align: center;
      margin-bottom: 1rem;
      line-height: 1.5rem;
      font-size: 1.083rem;
      font-weight: 400;
      color: #000;
    }
    .van-button {
      display: block;
      margin: 3rem auto 0;
      width: 8.333rem;
      height: 2.8rem;
      line-height: 2.8rem;
      background: #324BE3;
      border-color: #324BE3;
      border-radius: 2rem;
      font-size: 1.083rem;
      color: #fff;
    }
  }
  .second-page {
    background: #fff;
    .second-banner {
      position: relative;
      height: 28rem;
      padding: 1rem 1rem 0 1rem;
      background-size: cover;
      background-repeat: no-repeat;
      box-sizing: border-box;
      h3 {
        margin-top: 0;
        font-size: 2rem;
        font-weight: 600;
        color: #FFF;
        text-shadow: 0 .167rem .333rem rgba(0, 0, 0, .5);
      }
      p {
        margin: 2.416rem 1.25rem 0 1.25rem;
        font-size: 1.083rem;
        font-weight: 400;
        color: #FFF;
        line-height: 1.5rem;
      }
      h4 {
        color: #fff;
        font-weight: 400;
        font-size: 1.167rem;
        margin-bottom: 5rem;
        img {
          vertical-align: middle;
        }
      }
      .van-row {
        margin-top: 3rem;
        .van-col {
          div {
            border-radius: 20px;
            background: rgba(3, 11, 58, .4528);
            padding: .5rem 1rem;
            height: 2rem;
            line-height: 2rem;
          }
        }
        p {
          margin: 0;
          font-size: 1.083rem;
          font-weight: 600;
          color: #fff;
          line-height: 2rem;
          background: linear-gradient(163deg, #F4CB71 0%, #F2C86B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          img {
            width: 2rem;
            margin-right: .3rem;
            vertical-align: middle;
          }
        }
      }
    }
    .page-radius {
      .radius {
        top: -1.1rem;
        border-bottom: .3rem solid #fff;
        .van-button {
          top: 1rem
        }
      }
    }
    h3 {
      height: 2rem;
      line-height: 2rem;
      font-size: 1.4167rem;
      font-weight: 600;
      color: #000;
      text-align: center;
    }
    .van-steps {
      margin: .5rem 3.4167rem 0;
    }
    .button-area {
      margin: 2rem auto;
      text-align: center;
      .free-use {
        width: 9rem;
        height: 2.5rem;
        background: #324BE3;
        border-color: #324BE3;
        border-radius: 1.25rem;
        font-size: 1rem;
      }
      .doc {
        width: 9rem;
        height: 2.5rem;
        background: #F3F5FF;
        border-color: #F3F5FF;
        border-radius: 1.25rem;
        color: #324BE3;
        font-size: 1rem;
      }
    }
  }
  /deep/.van-swipe__indicators,.van-swipe__indicators--vertical {
    .van-swipe__indicator {
      width: 1rem;
      height: 1rem;
      margin-bottom: 1.5rem;
      opacity: .7;
      background-color: #999;
    }
    .van-swipe__indicator--active {
      background-color: #324BE3;
      opacity: 1;
    }
  }
}
.page-radius {
  position: relative;
  padding-top: 4rem;
  > .radius {
    position: absolute;
    width: 100%;
    top: -1rem;
    height: 1rem;
    border-radius: 1.3rem 1.3rem 0 0;
    border-bottom: 1px solid #fff;
    background: #fff;
    img {
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      top: -2.5rem;
    }
    .van-button {
      position: absolute;
      top: -2rem;
      right: 1rem;
      padding: 0;
      width: 6.8rem;
      height: 2.45rem;
      line-height: 2.45rem;
      background: #000;
      border-color: #000;
      border-radius: 2rem;
      font-size: 1.083rem;
    }
  }
}

.van-notice-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2rem;
  .notice-swipe {
    height: 2rem;
    line-height: 2rem;
    width: 100%;
    .van-swipe-item {
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
    }
  }
}
</style>
