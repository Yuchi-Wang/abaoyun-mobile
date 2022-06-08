<template>
  <div class="main">
    <div class="logo" />
    <h3 class="title">阿宝云</h3>
    <van-tabs
      v-model="active"
      swipeable
      color="#324BE3"
      title-active-color="#324BE3"
      @change="handleChange"
    >
      <van-tab title="手机找回">
        <van-field
          v-model="mobile"
          class="mobile"
          type="tel"
          maxlength="11"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="vcCode"
          class="mobile"
          type="tel"
          clearable
          placeholder="请输入短信验证码"
        >
          <template #button>
            <p v-if="!isConutDownShow && time === -1" class="send-code" @click="getVcode">发送验证码</p>
            <span class="count-down-area">
              <van-count-down v-if="isConutDownShow" :time="time" format="ss 秒重新发送" class="finish-send" @finish="finish" />
              <span v-if="time === 0" class="send-code" @click="reSend">重新发送</span>
            </span>
          </template>
        </van-field>
        <van-field
          v-model="password"
          class="mobile"
          type="password"
          maxlength="16"
          placeholder="请输入密码"
        />
      </van-tab>
      <van-tab title="邮箱找回">
        <van-field
          v-model="email"
          class="mobile"
          maxlength="50"
          placeholder="请输入邮箱号"
        />
        <van-field
          v-model="vcCode"
          class="mobile"
          type="tel"
          clearable
          maxlength="6"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <p v-if="!isConutDownShow && time === -1" class="send-code" @click="getVcode">发送验证码</p>
            <span class="count-down-area">
              <van-count-down v-if="isConutDownShow" :time="time" format="ss 秒重新发送" class="finish-send" @finish="finish" />
              <span v-if="time === 0" class="send-code" @click="reSend">重新发送</span>
            </span>
          </template>
        </van-field>
        <van-field
          v-model="password"
          class="mobile"
          type="password"
          maxlength="16"
          placeholder="请输入新密码"
        />
      </van-tab>
    </van-tabs>
    <van-button round type="info" class="submit" @click="submit">确认</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getMobileMessage, getEmailMessage, foundPassword } from '@/api/user'
export default {
  name: 'ForgotPassword',
  data: () => ({
    mobile: '',
    email: '',
    emailTest: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    vcCode: '',
    password: '',
    active: 0,
    isConutDownShow: false,
    time: -1,
    passwordTest: /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/
  }),
  methods: {
    handleChange() {
      this.mobile = ''
      this.email = ''
      this.password = ''
      this.isConutDownShow = false
      this.time = -1
    },
    reSend() {
      this.getVcode()
    },
    finish() {
      this.time = 0
      this.isConutDownShow = false
    },
    conutDown() {
      this.time = 1000 * 60
      this.isConutDownShow = true
    },
    getMobileMessage() {
      if (this.mobile === '') {
        Toast.fail('请输入手机号')
      } else if (this.mobile.length !== 11) {
        Toast.fail('手机号码格式不对')
      } else {
        const params = {
          phone: this.mobile,
          type: '3'
        }
        getMobileMessage(params).then(res => {
          Toast(res.data.msg)
        })
      }
    },
    getEmailMessage() {
      if (!this.email) {
        Toast.fail('请输入邮箱号')
      } else if (!this.emailTest.test(this.email)) {
        Toast.fail('邮箱格式不对')
      } else {
        const params = {
          mailTo: this.email,
          title: '【阿宝云邮箱验证】找回密码',
          type: '3'
        }
        getEmailMessage(params).then(res => {
          Toast(res.data.msg)
        })
      }
    },
    getVcode() {
      this.conutDown()
      if (this.active === 0) {
        this.getMobileMessage()
      } else {
        this.getEmailMessage()
      }
    },
    submit() {
      if (this.password === '') {
        Toast('密码不能为空')
      } else if (!this.passwordTest.test(this.password)) {
        Toast('至少包含6位字符、小写字母及数字组合、1位大写字母')
      } else {
        // 1手机找回，2邮箱找回
        const params = {
          phone_email: this.active ? this.email : this.mobile,
          password: this.password,
          type: this.active + 1 + '',
          code: this.vcCode
        }
        foundPassword(params).then(res => {
          if (res.data.code === 200) {
            Toast(res.data.msg)
            this.$router.replace('/login')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 6rem 4.6rem 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  .logo {
    width: 12rem;
    height: 12rem;
    background: url('../../assets/img/user/my/logo.svg');
    background-repeat: no-repeat;
    background-size: contain;
    margin: auto;
  }
  h3 {
    height: 2.083rem;
    line-height: 2.083rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #000;
    text-align: center;
    margin-top: .667rem;
    margin-bottom: 2rem;
  }
  .mobile {
    margin-top: .5rem;
    border-bottom: 1px solid #EDEDED;
    padding-bottom: 3.5px;
  }
  .send-code {
    color: #324BE3;
  }
  .finish-send {
    color: #999;
  }
  .submit {
    width: 20.833rem;
    height: 3.333rem;
    line-height: 3.333rem;
    margin-top: 2.5rem;
    background: #324BE3;
    border-color: #324BE3;
    border-radius: 1.667rem;
    text-align: center;
  }
}
</style>
