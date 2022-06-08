<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group v-if="!isSetPassword">
      <van-field v-model="originPassword" type="password" label="请输入原密码" maxlength="16" placeholder="请输入当前登录密码" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="newPassword" type="password" :label="label" maxlength="16" :placeholder="'请' + label" />
    </van-cell-group>
    <van-button round type="info" @click="save">保存</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { editUserInfo, getUserInfo } from '@/api/user'
export default {
  name: 'EditPassword',
  data: () => ({
    headerTitle: '',
    originPassword: '',
    newPassword: '',
    isSetPassword: false,
    userDetail: {},
    label: '',
    passwordTest: /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/
  }),
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query.operation === 'set') { this.isSetPassword = true }
      this.headerTitle = this.isSetPassword ? '设置登录密码' : '修改登录密码'
      this.label = this.isSetPassword ? '设置新密码' : '确认新密码'
      if (!this.isSetPassword) {
        getUserInfo({ user_code: localStorage.getItem('userCode') }).then(res => {
          this.userDetail = res.data.data
        })
      }
    },
    editPassword() {
      const params = {
        user_code: localStorage.getItem('userCode'),
        user_password: this.newPassword
      }
      editUserInfo(params).then(res => {
        if (res.data.code === 200) {
          Toast('设置密码成功')
          this.$router.replace('/personal-data')
        }
      })
    },
    save() {
      if (this.newPassword === '') {
        Toast('密码不能为空')
      } else if (!this.passwordTest.test(this.newPassword)) {
        Toast('至少包含6位字符、小写字母及数字组合、1位大写字母')
      } else {
        if (this.isSetPassword) {
          this.editPassword()
        } else {
          if (this.originPassword !== this.userDetail.user_password) {
            Toast('原密码错误')
          } else if (this.newPassword === this.userDetail.user_password) {
            Toast('新密码不能和原密码相同')
          } else {
            this.editPassword()
          }
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
