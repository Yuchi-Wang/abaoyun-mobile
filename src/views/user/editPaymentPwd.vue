<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group v-if="!isSetPassword">
      <van-field v-model="originPassword" type="password" label="原密码" maxlength="16" placeholder="请输入当前支付密码" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="newPassword" type="password" :label="label" maxlength="16" :placeholder="'请' + placeholder" />
    </van-cell-group>
    <van-button round type="info" @click="save">保存</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { editUserInfo, getUserInfo, updatePaymentPwd } from '@/api/user'
export default {
  name: 'EditPaymentPwd',
  data: () => ({
    headerTitle: '',
    originPassword: '',
    newPassword: '',
    isSetPassword: false,
    userDetail: {},
    label: '',
    placeholder: ''
  }),
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query.operation === 'set') { this.isSetPassword = true }
      this.headerTitle = this.isSetPassword ? '设置支付密码' : '修改支付密码'
      this.label = this.isSetPassword ? '设置新密码' : '确认新密码'
      this.placeholder = this.isSetPassword ? '设置新支付密码' : '确认支付新密码'
      if (!this.isSetPassword) {
        getUserInfo({ user_code: localStorage.getItem('userCode') }).then(res => {
          this.userDetail = res.data.data
        })
      }
    },
    editPassword() {
      const params = {
        user_code: localStorage.getItem('userCode'),
        payment_code: this.newPassword
      }
      editUserInfo(params).then(res => {
        if (res.data.code === 200) {
          Toast('设置支付密码成功')
          this.$router.replace('/personal-data')
        }
      })
    },
    updatePaymentPwd() {
      const params = {
        user_code: localStorage.getItem('userCode'),
        oldPassword: this.originPassword,
        newPassword: this.newPassword
      }
      updatePaymentPwd(params).then(res => {
        Toast('修改支付密码成功')
        this.$router.replace('/personal-data')
      })
    },
    save() {
      if (!this.originPassword.length && this.$route.query.operation !== 'set') {
        Toast('原密码不能为空')
      } else if (this.newPassword === '') {
        Toast('密码不能为空')
      } else if (this.newPassword.length < 6) {
        Toast('密码不得低于6位字符')
      } else {
        if (this.isSetPassword) {
          this.editPassword()
        } else {
          this.updatePaymentPwd()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group {
  margin: .833rem;
   border-radius: .667rem;
  .van-cell {
    border-radius: .667rem;
  }
}
.van-button {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 8.25rem;
  width: 20.833rem;
  background: #0078F8;
  box-shadow: 0 1.5rem 1rem 0 #E1F0FF;
}
</style>
