<template>
  <div class="home-main">
    <van-swipe class="main-page" :show-indicators="!assistantShow" :loop="false" :touchable="!assistantShow" :style="{'height': windowsHeight + 'px'}" vertical>
      <van-swipe-item class="first-page">
        <div class="first-banner" :style="{backgroundImage: `url(${$imgUrl}${abaoDetail.imageUrl})`}">
          <h4>
            <img src="../../assets/img/home/home-logo.svg">
            阿宝云
          </h4>
          <div class="service-img">
            <img src="../../assets/img/user/my/service.svg" @click="assistant">
          </div>
          <van-notice-bar v-if="noticeShow && !assistantShow" left-icon="volume-o" background="rgba(0,0,0,0)" color="#fff" :scrollable="false">
            <van-swipe
              vertical
              class="notice-swipe"
              :autoplay="3000"
              :show-indicators="false"
            >
              <van-swipe-item v-for="item in noticeList" :key="item.id" @click="getNoticeDetail(item.notice_id)">{{ item.title }}</van-swipe-item>
            </van-swipe>
          </van-notice-bar>
          <h3>阿宝是什么?</h3>
          <p>阿宝是协助您进行股票交易的智能AI助手</p>
        </div>
        <div class="page-radius">
          <div class="radius">
            <img src="../../assets/img/home/root.svg">
            <van-button type="info" @click="consultUs">立即咨询</van-button>
          </div>
          <h3 class="main-title">阿宝能做什么？</h3>
          <p>通过金融NLP技术、人脸识别、语音等技术</p>
          <p>摆脱传统的交易模式，在随意、流动的场景进行交易</p>
          <van-button type="info" class="free-use" @click="getAbaoDetail" style="margin-top:2rem">了解详情</van-button>
          <a href="https://beian.miit.gov.cn/" target="_blank" class="record">沪ICP备17050032号-3</a>
        </div>
        <van-popup
          id="assistant"
          v-model="assistantShow"
          round
          position="bottom"
          :style="{ height: '33rem'}"
          :close-on-click-overlay="false"
          :closeable="true"
          class="assistant"
          style="position: absolute"
          @close="onClose"
        >
          <h4>智能助手</h4>
          <div class="chat-content">
            <div v-for="(item, index) in chatContent" :key="index" class="chat-item">
              <!-- 对方 -->
              <div v-if="!item.mineMsg" class="word">
                <img src="../../assets/img/user/my/service.svg">
                <div class="info-content">
                  <h4 v-if="index === 0" class="roll-question">
                    <van-icon name="question" />
                    猜你想问
                    <span @click="getRollQuestion"><van-icon name="replay" />换一换</span>
                  </h4>
                  <div @click="getCommonQuestion" v-html="item.contactText" />
                </div>
              </div>
              <!-- 我的 -->
              <div v-else class="word-my">
                <div class="info-content">{{ item.contactText }}</div>
                <van-image
                  round
                  width="3.3rem"
                  height="3.3rem"
                  :src="avatarUrl ? avatarUrl : defaultAvatar"
                  class="avatar"
                />
              </div>
            </div>
          </div>
          <footer ref="footer">
            <van-field
              v-model="submitValue"
              type="textarea"
              autosize
              rows="1"
              clearable
              maxlength="50"
              @blur="inputBlur"
            />
            <van-button type="primary" :disabled="!submitValue.length">发送</van-button>
          </footer>
        </van-popup>
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
            <a href="https://beian.miit.gov.cn/" target="_blank" class="record">沪ICP备17050032号-3</a>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-popup v-model="showPopup" class="phone-popup">
      <h3>咨询电话</h3>
      <p>
        <van-icon name="phone" />
        021-61266911
      </p>
    </van-popup>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getList } from '@/api/product'
import { getUserInfo } from '@/api/user'
import { getList as getHelpList, getRollQuestion } from '@/api/help'
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
    noticeShow: false,
    assistantShow: false,
    submitValue: '',
    chatContent: [],
    commonQuestion: false,
    baseUrl: '',
    avatarUrl: '',
    defaultAvatar: require('@/assets/img/user/my/user.svg'),
    rollPageIndex: 1
  }),
  mounted() {
    this.getProductList()
    this.getNoticeList()
    this.getHelperList()
    this.init()
    this.getKeyboardStatus()
  },
  beforeDestroy() {
    this.onClose()
  },
  methods: {
    init() {
      const env = process.env.NODE_ENV
      if (env === 'development' || env === 'test') {
        this.baseUrl = 'http://210.5.7.219:8028/v1/uploading/ReadAndParseImages'
      } else {
        this.baseUrl = 'http://120.55.164.177/v1/uploading/ReadAndParseImages'
      }
      this.getPersonal()
    },
    getKeyboardStatus() {
      const u = navigator.userAgent
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      if (isAndroid) {
        const originalHeight = document.documentElement.clientHeight || document.body.clientHeight
        window.onresize = function() {
          const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight
          if (resizeHeight < originalHeight) {
            //  当软键盘弹起，在此处操作
            document.getElementById('assistant').style.bottom = '20rem'
          } else {
            // 当软键盘收起，在此处操作
            document.getElementById('assistant').style.bottom = '0'
          }
        }
      }
    },
    getPersonal() {
      const token = getToken()
      if (token) {
        const params = {
          user_code: localStorage.getItem('userCode')
        }
        getUserInfo(params).then(response => {
          if (response.data.data.head_photo !== '' && response.data.data.head_photo) {
            this.avatarUrl = `${this.baseUrl}${response.data.data.head_photo}`
          }
        })
      }
    },
    consultUs() {
      this.showPopup = true
    },
    inputBlur() {
      if (this.submitValue !== '') {
        this.submit()
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector('.chat-content')
        container.scrollTop = container.scrollHeight
      })
    },
    getCommonQuestion(e) {
      if (this.commonQuestion && e.target.localName === 'li') {
        this.submitValue = e.target.innerText
        this.submit()
      }
    },
    getRollQuestion() {
      const params = {
        pageIndex: this.rollPageIndex,
        pageSize: 6,
        use: 2
      }
      getRollQuestion(params).then(res => {
        const result = res.data.data
        res.data.pageNum * res.data.pageSize < res.data.total ? this.rollPageIndex++ : this.rollPageIndex = 1
        this.chatContent[0].contactText = result[0].answer || result
      })
    },
    getHelperList() {
      this.assistantShow = false
      const params = {
        pageIndex: 1,
        pageSize: 6,
        type: 2,
        use: 2
      }
      getHelpList(params).then(res => {
        this.commonQuestion = true
        const result = res.data.data
        this.chatContent.push({
          mineMsg: false,
          contactText: result[0].answer || result
        })
      })
    },
    submit() {
      const subContent = this.submitValue.trim()
      this.chatContent.push({
        mineMsg: true,
        contactText: subContent
      })
      this.submitValue = ''
      this.scrollToBottom()
      const params = {
        keyword: subContent,
        use: 2
      }
      getHelpList(params).then(res => {
        this.chatContent.push({
          mineMsg: false,
          contactText: res.data.data[0].answer || res.data.data
        })
        this.scrollToBottom()
      })
    },
    assistant() {
      this.assistantShow = true
      this.$addStorageEvent(2, 'assistantShow', 0)
    },
    onClose() {
      this.assistantShow = false
      this.$addStorageEvent(2, 'assistantShow', 1)
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
          return item.product_name === '诚龙阿宝'
        })
        this.nlpDetail = productList.find(item => {
          return item.product_name === '金融NLP'
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
  .phone-popup {
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
    position: relative;
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
        margin-top: 1rem;
        margin-bottom: 1rem;
        img {
          vertical-align: text-top;
        }
      }
      .service-img {
        position: absolute;
        top: 1.2rem;
        right: 1rem;
        img {
          width: 3.5rem;
        }
      }
    }
    .assistant {
      overflow: hidden;
      z-index: 99999;
      position: relative;
      background: #fff!important;
      h4 {
        margin-top: 1.17rem;
        text-align: center;
        height: 1.67rem;
        line-height: 1.67rem;
        font-size: 1.17rem;
        font-weight: 600;
        color: #171717;
      }
      > div {
        padding: 1.25rem 1.25rem 0 1.25rem;
        height: 23rem;
        overflow: auto;
      }
      footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
        background: #e8e8e8;
        z-index: 9999;
        .van-cell {
          width: 80%;
        }
        .van-field {
          border-radius: .4rem;
        }
        .van-button {
          width: 5rem;
          height: 3.5rem;
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          border-radius: .4rem;
          background: #324BE3;
          border-color: #324BE3;
        }
      }
      .word {
        display: flex;
        margin-bottom: .583rem;
        img {
          width: 3.3rem;
          height: 3.3rem;
          border-radius: 50%;
        }
        .info-content {
          position: relative;
          max-width: 68%;
          margin-top: .667rem;
          margin-left: .833rem;
          padding: .833rem;
          background: #FFFFFF;
          box-shadow: 0rem 0rem 1.17rem 0rem rgba(207, 207, 207, 0.5);
          border-radius: .333rem;
          line-height: 1.667rem;
          font-size: 1.167rem;
          white-space:  pre-wrap;
          &:before {
            position: absolute;
            left: -.667rem;
            top: .667rem;
            content: '';
            border-right: .833rem solid #FFFFFF;
            box-shadow: 0rem 0rem 1.17rem 0rem rgba(207, 207, 207, 0.5);
            border-top: .667rem solid transparent;
            border-bottom: .667rem solid transparent;
          }
          .roll-question {
            position: relative;
            color: #324BE3;
            margin: 0;
            text-align: left;
            height: 1.333rem;
            margin-bottom: .3rem;
            .van-icon {
              font-size: 1.333rem;
              vertical-align: text-bottom;
            }
            span {
              position: absolute;
              right: 0;
              font-size: 1rem;
              color: #999;
              .van-icon {
                font-size: 1rem;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .word-my {
        display: flex;
        justify-content:flex-end;
        margin-bottom: .583rem;
        img{
          width: 3.3rem;
          height: 3.3rem;
          border-radius: 50%;
        }
        .info-content {
          position: relative;
          max-width: 68%;
          padding: .833rem;
          margin: .667rem .833rem 0 0;
          background: #324BE3;
          color: #fff;
          line-height: 1.667rem;
          font-size: 1.167rem;
          border-radius: .333rem;
          &:after {
            position: absolute;
            right: -.667rem;
            top: .667rem;
            content: '';
            border-left: .833rem solid #324BE3;
            border-top: .667rem solid transparent;
            border-bottom: .667rem solid transparent;
          }
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
        margin-top: 1rem;
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
      .record {
        color: #555;
        position: absolute;
        margin-top: 4.5rem;
        left: 50%;
        transform: translateX(-50%);
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
  .record {
    color: #555;
    position: absolute;
    margin-top: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
}

.van-notice-bar {
  position: absolute;
  // top: 0;
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
