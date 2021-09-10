<template>
  <div class="main">
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-cell title="昵称" :label="nickname" :border="false" is-link @click="editData('name')" />
      <van-cell title="邮箱" :label="email" :value="email ? '已绑定' : ''" :border="false" is-link @click="bindEmail" />
      <van-cell title="手机号" :label="mobile" :value="mobile ? '已绑定' : ''" :border="false" is-link @click="changeBinding" />
      <van-cell title="地址" :label="userDetail.adress" :border="false" is-link @click="editData('addr')" />
      <van-cell :title="isHasPassword ? '修改密码': '设置密码'" :border="false" is-link @click="editPassword" />
    </van-cell-group>
    <van-button type="warning" @click="cancelAccount">注销账户</van-button>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { getUserInfo, cancelAccount } from '@/api/user'
export default {
  name: 'PersonalData',
  data: () => ({
    headerTitle: '个人资料',
    email: '',
    name: '',
    mobile: '',
    userCode: '',
    nickname: '',
    userDetail: {},
    isHasPassword: false
  }),
  mounted() {
    this.getPersonal()
  },
  methods: {
    cancelAccount() {
      Dialog.confirm({
        title: '确认注销账户 ？',
        message: '删除您的阿宝云账户，用户数据将无法恢复'
      }).then(() => {
        cancelAccount(localStorage.getItem('userCode')).then(res => {
          if (res.code === 200) {
            Toast('注销成功')
            localStorage.clear()
            this.$router.replace('/')
          }
        })
      }).catch(() => {
        // on cancel
      })
    },
    getPersonal() {
      const params = {
        user_code: localStorage.getItem('userCode')
      }
      getUserInfo(params).then(response => {
        this.userDetail = response.data.data
        this.email = this.userDetail.email
        this.mobile = this.userDetail.phone
        this.nickname = this.userDetail.nickname
        this.isHasPassword = !!this.userDetail.user_password
      })
    },
    editData(name) {
      this.$router.push({
        name: 'editPersonalData',
        query: {
          type: name
        }
      })
    },
    bindEmail() {
      if (this.email) {
        this.$router.push({
          name: 'confirmBinding',
          query: {
            type: 'email',
            operation: 'changeBinding',
            num: this.email
          }
        })
      } else {
        this.$router.push({
          name: 'editPersonalData',
          query: {
            type: 'email',
            operation: 'confirmBinding'
          }
        })
      }
    },
    changeBinding() {
      if (!this.mobile) {
        this.$router.push({
          name: 'changeBinding',
          query: {
            redirect: '/personal-data'
          }
        })
      } else {
        this.$router.push({
          name: 'confirmBinding',
          query: {
            type: 'mobile',
            operation: 'changeBinding',
            num: this.mobile
          }
        })
      }
    },
    editPassword() {
      this.$router.push({
        name: 'editPassword',
        query: {
          operation: this.isHasPassword ? 'edit' : 'set'
        }
      })
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
.main {
  .van-button {
    display: block;
    margin: 2rem auto 0;
    background: #EE0A24;
    border: 1px solid #EE0A24;
    width: 22rem;
    border-radius: .833rem;
  }
}
</style>
