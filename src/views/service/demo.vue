<!-- 此文件只做演示扣次数，非正式使用环境 2021-9-28 -->
<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div ref="chatContent" class="chat-content">
      <div>
        <div v-for="(item, index) in chatContent" :key="index" class="chat-item">
          <!-- 对方 -->
          <div v-if="!item.mineMsg" class="word">
            <img src="../../assets/img/user/my/system_avatar.png">
            <div class="info-content" v-html="item.contactText" />
          </div>
          <!-- 我的 -->
          <div v-else class="word-my">
            <div class="info-content">{{ item.contactText }}</div>
            <img src="../../assets/img/user/my/user.svg">
          </div>
        </div>
      </div>
    </div>
    <footer ref="footer">
      <van-field
        v-model="value"
        type="textarea"
        autosize
        rows="1"
        clearable
        @blur="inputBlur"
      />
      <van-button type="primary" :disabled="!value.length" @click="submit">发送</van-button>
    </footer>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getChatDialogue, getChatList } from '@/api/service'
export default {
  name: 'ChatRoom',
  data: () => ({
    headerTitle: '阿宝',
    value: '',
    chatContent: [],
    equipment: ''
  }),
  mounted() {
    this.getChatList()
    this.scrollToBottom()
  },
  updated() {
    this.scrollToBottom()
  },
  methods: {
    inputBlur() {
      if (this.value !== '') {
        this.submit()
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector('.chat-content')
        container.scrollTop = container.scrollHeight
      })
    },
    getChatList() {
      getChatList({ user_code: localStorage.getItem('userCode') }).then(res => {
        res.data.data.list.map(item => {
          this.chatContent.push({
            mineMsg: true,
            contactText: item.send_content
          })
          this.chatContent.push({
            mineMsg: false,
            contactText: item.receive_content
          })
        })
      })
    },
    submit() {
      const subContent = this.value
      this.chatContent.push({
        mineMsg: true,
        contactText: subContent
      })
      this.value = ''
      const params = {
       fromusername: localStorage.getItem('userCode'),
       content: subContent
      }
      getChatDialogue(params).then(res => {
        const result = res.data.data
        if (result.code === '0') {
          this.chatContent.push({
            mineMsg: false,
            contactText: result.content
          })
        } else {
          Toast(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
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
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    border-radius: .4rem;
    background: #324BE3;
    border-color: #324BE3;
  }
}
.chat-content {
  padding: 1.25rem 1.25rem 8rem 1.25rem;
  height: calc(100% - 13rem);
  overflow: auto;
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
      background: #fff;
      border-radius: .333rem;
      line-height: 1.667rem;
      font-size: 1.167rem;
      white-space:  pre-wrap;
      &:before {
        position: absolute;
        left: -.667rem;
        top: .667rem;
        content: '';
        border-right: .833rem solid #FFF;
        border-top: .667rem solid transparent;
        border-bottom: .667rem solid transparent;
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
</style>
