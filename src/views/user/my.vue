<template>
  <div class="my-main">
    <div class="user-area">
      <van-image
        v-if="avatarUrl"
        round
        width="5rem"
        height="5rem"
        :src="avatarUrl"
        class="avatar"
        @click="handleView('/personal-data')"
      />
      <span v-if="userToken">{{ userName }}</span>
      <span v-else @click="login">立即登录</span>
      <img src="../../assets/img/user/my/custom.png" class="custom" @click.passive="assistant">
    </div>
    <div class="user-fuction">
      <ul>
        <li
          v-for="item in userFunctionList"
          :key="item.id"
          span="4"
          @click="getDetail(item.path)"
        >
          <van-badge v-if="item.title === '消息' && notRead" :content="notRead">
            <div class="user-list-bg" :style="{backgroundImage: 'url('+ item.src +')'}" />
          </van-badge>
          <div v-else class="user-list-bg" :style="{backgroundImage: 'url('+ item.src +')'}" />
          <p>{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <van-cell-group>
      <van-cell v-for="item in myFuctionList" :key="item.id" :border="false" is-link @click="handleView(item.path)">
        <template #title>
          <img :src="item.src">
          <span class="custom-title">{{ item.title }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-button v-if="userToken" @click="logout">
      <img src="../../assets/img/user/my/log-out.svg">
      <span>退出登录</span>
    </van-button>
    <!-- 智能助手 -->
    <van-popup
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
          @blur="inputBlur"
        />
        <van-button type="primary" :disabled="!submitValue.length">发送</van-button>
      </footer>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/api/user'
import { getList as getHelpList, getRollQuestion } from '@/api/help'
export default {
  name: 'My',
  data: () => ({
    defaultAvatar: require('@/assets/img/user/my/user.svg'),
    avatarUrl: '',
    userFunctionList: [
      {
        id: 1,
        src: require('@/assets/img/user/my/message.svg'),
        title: '消息',
        path: '/message-list'
      },
      {
        id: 2,
        src: require('@/assets/img/user/my/order.svg'),
        title: '订单',
        path: '/order-list'
      },
      {
        id: 3,
        src: require('@/assets/img/user/my/contract.svg'),
        title: '合同',
        path: '/contract-list'
      },
      {
        id: 4,
        src: require('@/assets/img/user/my/charge.svg'),
        title: '充值',
        path: '/recharge'
      },
      {
        id: 5,
        src: require('@/assets/img/user/my/invoice.svg'),
        title: '发票',
        path: '/invoice-list'
      }
    ],
    myFuctionList: [
      {
        id: 1,
        src: require('@/assets/img/user/my/person.svg'),
        title: '个人资料',
        path: '/personal-data'
      },
      {
        id: 2,
        src: require('@/assets/img/user/my/my-service.svg'),
        title: '我的服务',
        path: '/service-list'
      },
      {
        id: 3,
        src: require('@/assets/img/user/my/about-us.svg'),
        title: '关于我们',
        path: '/about-us'
      },
      {
        id: 4,
        src: require('@/assets/img/user/my/about-us.svg'),
        title: '兑换码',
        path: '/exchange-code'
      }
    ],
    userName: '',
    userToken: '',
    notRead: 0,
    assistantShow: false,
    submitValue: '',
    chatContent: [],
    commonQuestion: false,
    baseUrl: '',
    rollPageIndex: 1
  }),
  mounted() {
    this.getPersonal()
    this.getHelperList()
    this.init()
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
    },
    handleView(path) {
      this.$router.push(path)
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
        this.chatContent.push({
          mineMsg: false,
          contactText: res.data.data[0].answer || res.data.data
        })
      })
    },
    submit() {
      const subContent = this.submitValue
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
    getPersonal() {
      this.userToken = getToken()
      if (this.userToken) {
        const params = {
          user_code: localStorage.getItem('userCode')
        }
        getUserInfo(params).then(response => {
          this.notRead = Number(response.data.data.has_read)
          this.userName = response.data.data.nickname
          if (response.data.data.head_photo !== '' && response.data.data.head_photo) {
            this.avatarUrl = `${this.baseUrl}${response.data.data.head_photo}`
          } else {
            this.avatarUrl = this.defaultAvatar
          }
        })
      } else {
        this.avatarUrl = this.defaultAvatar
      }
    },
    login() {
      this.$router.replace('/login')
    },
    getDetail(path) {
      this.$router.push(path)
    },
    logout() {
      Dialog.confirm({
        message: '确认退出登录 ？'
      }).then(() => {
        localStorage.clear()
        this.$router.replace('/login')
      }).catch(() => {
        // on cancel
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-main {
  .user-area {
    position: relative;
    padding: 4.75rem .75rem;
    height: 14.17rem;
    box-sizing: border-box;
    background: url('../../assets/img/user/my/my-bg.png') no-repeat;
    background-size: contain;
    overflow: hidden;
    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 6.2rem;
      font-size: 1.167rem;
      font-weight: 600;
      color: #fff;
      line-height: 1.1667rem;
    }
    img.custom {
      position: absolute;
      width: 6.42rem;
      right: 2.25rem;
      bottom: 2.5rem;
      z-index: 1;
    }
  }
  .user-fuction {
    position: relative;
    height: 7.75rem;
    margin: -4rem .83rem .83rem;
    border-radius: .667rem;
    background: linear-gradient(170deg, #2C2E35 0%, #63606C 100%);
    box-sizing: border-box;
    ul {
      display: flex;
      height: 7.75rem;
      align-items:center;
      li {
        width: 20%;
        text-align: center;
        /deep/ .van-badge {
          border: 1px solid #ee0a24;
        }
        /deep/.van-badge--fixed {
          top: .2rem;
          right: .2rem;
        }
        .user-list-bg {
          width: 2.33rem;
          height: 2.33rem;
          background-repeat: no-repeat;
          background-size: cover;
          margin: auto;
        }
        p {
          color: #FFEDAD;
          font-weight: 400;
          line-height: 1.4167rem;
          margin-top: .583rem;
        }
      }
    }
  }
  .van-cell-group {
    margin: 1.25rem .83rem .83rem .83rem;
    border-radius: .667rem;
    .van-cell {
      border-radius: .667rem;
      /deep/.van-cell__title {
        img {
          margin-right: .17rem;
          vertical-align: middle;
        }
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
}
.van-button {
  display: block;
  margin: 2rem auto 0;
  width: 29.58rem;
  height: 3rem;
  background: #fff;
  border-radius: 0.33rem;
  img {
    vertical-align: top;
    margin-right: .17rem;
  }
}
</style>
