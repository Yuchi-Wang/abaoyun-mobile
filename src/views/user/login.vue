<template>
  <div id="main" class="main">
    <div class="logo" />
    <h3 class="title">阿宝云</h3>
    <van-tabs
      v-model="active"
      swipeable
      color="#fff"
      title-active-color="#fff"
      title-inactive-color="rgba(255,255,255,.5)"
      background="transparent"
      @change="handleChange"
    >
      <van-tab title="手机号">
        <van-field
          v-model="tel"
          class="mobile"
          type="tel"
          maxlength="11"
          :border="false"
          placeholder="请输入手机号"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </van-tab>
      <van-tab title="邮箱">
        <van-field
          v-model="email"
          class="mobile"
          maxlength="50"
          :border="false"
          placeholder="请输入邮箱号"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </van-tab>
      <van-tab title="账号登录">
        <van-field
          v-model="account"
          class="mobile"
          maxlength="50"
          :border="false"
          placeholder="请输入手机/邮箱号"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <van-field
          v-model="password"
          type="password"
          class="mobile"
          maxlength="16"
          :border="false"
          placeholder="请输入密码"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </van-tab>
      <p v-if="active === 2" class="forgot-password" @click="forgetPassword">忘记密码？</p>
    </van-tabs>
    <!-- <van-checkbox v-model="checked" class="policy">
      请阅读并同意 <span>《用户协议》</span>和<span>《隐私政策》</span>
    </van-checkbox> -->
    <van-button v-if="active === 0 || active === 1" round type="info" @click="getVcCode">获取验证码</van-button>
    <van-button v-if="active === 2" round type="info" :loading="loginLoading" @click="login">登录</van-button>
    <p class="return-home" :style="{'display':isHidden ? 'none':'block'}" @click="turnBack">返回首页</p>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { setToken } from '@/utils/auth'
import { passwordLogin } from '@/api/user'
export default {
  name: 'Login',
  data: () => ({
    tel: '',
    d: false,
    active: 0,
    email: '',
    emailTest: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    redirect: '/',
    account: '',
    password: '',
    loginLoading: false,
    isHidden: false,
    timer: null
  }),
  mounted() {
    this.init()
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    init() {
      const redirect = this.$route.query.redirect
      if (redirect) {
        this.redirect = redirect
      }
    },
    handleFocus() {
      this.isHidden = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    handleBlur() {
      this.timer = setTimeout(() => {
        window.scrollTo(0, 0)
      }, 10)
      setTimeout(() => {
        this.isHidden = false
      }, 300)
    },
    turnBack() {
      this.$router.replace('/')
    },
    handleChange() {
      this.tel = ''
      this.email = ''
    },
    getVcCode() {
      if (this.active === 0) {
        if (!this.tel) {
          Toast.fail('请输入手机号')
        } else if (this.tel.length !== 11) {
          Toast.fail('手机号码格式不对')
        } else {
          this.$router.replace({
            name: 'vcCode',
            query: {
              type: 'mobile',
              operation: 'sigin',
              phoneNum: this.tel,
              redirect: this.redirect
            }
          })
        }
      } else if (this.active === 1) {
        if (!this.email) {
          Toast.fail('请输入邮箱号')
        } else if (!this.emailTest.test(this.email)) {
          Toast.fail('邮箱格式不对')
        } else {
          this.$router.replace({
            name: 'vcCode',
            query: {
              type: 'email',
              operation: 'sigin',
              email: this.email,
              redirect: this.redirect
            }
          })
        }
      }
    },
    login() {
      this.loginLoading = true
      const params = {
        phone_email: this.account,
        password: this.password
      }
      passwordLogin(params).then(res => {
        if (res.data.code === 200) {
          localStorage.setItem('userCode', res.data.data.user_code)
          setToken(res.data.data.token)
          this.$router.replace(this.redirect)
        } else {
          this.loginLoading = false
        }
      }).finally(() => {
        this.loginLoading = false
      })
    },
    forgetPassword() {
      this.$router.push('/forgot-password')
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 7.083rem 4.6rem 0;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  background: url("../../assets/img/user/my/login-bg.jpg") no-repeat;
  background-size: cover;
  box-sizing: border-box;
  .return-home {
    position: absolute;
    bottom: 3rem;
    font-size: 1.1rem;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
  }
  .logo {
    width: 11.3rem;
    height: 11.3rem;
    background: url('../../assets/img/user/my/login-logo.svg');
    background-repeat: no-repeat;
    background-size: contain;
    margin: auto;
  }
  h3 {
    height: 2.083rem;
    line-height: 2.083rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    text-align: center;
    margin-top: .667rem;
    margin-bottom: 2rem;
  }
  .mobile {
    margin-top: 1.5rem;
    border-bottom: 1px solid #EDEDED;
    padding-bottom: 3.5px;
  }
  .policy {
    margin-top: .79167rem;
  }
  .van-button {
    width: 100%;
    margin-top: 4.833rem;
    background: #0078F8;
    border-color: #0078F8;
  }
  .van-field {
    background: transparent;
    /deep/ .van-field__control {
      color: #fff;
    }
  }
  .forgot-password {
    margin-top: 1rem;
    text-align: right;
    color: #fff;
    font-size: 1.1rem;
  }
}
</style>
