<template>
  <div class="main">
    <baseHeader :header-title="headerTitle" />
    <van-cell-group v-if="userDetail">
      <uploadAvatar :avatar-url="avatarUrl" @refresh="refreshData" />
      <van-cell title="昵称" :label="nickname" :border="false" is-link @click="editData('name')" />
      <van-cell title="邮箱" :label="email" :value="email ? '已绑定' : ''" :border="false" is-link @click="bindEmail" />
      <van-cell title="手机号" :label="mobile" :value="mobile ? '已绑定' : ''" :border="false" is-link @click="changeBinding" />
      <van-cell title="地址" :label="userDetail.adress" :border="false" is-link @click="editData('addr')" />
      <van-cell :title="isHasPassword ? '修改登录密码': '设置登录密码'" :border="false" is-link @click="editPassword" />
      <van-cell :title="isHasPaymentPassword ? '修改支付密码': '设置支付密码'" :border="false" is-link @click="editPaymentPwd" />
      <van-cell v-if="userDetail.user_type" :title="userDetail.user_type === '1' ? '个人用户': '企业用户'" />
      <van-cell v-if="!userDetail.user_type" title="选择个人/企业" :border="false" is-link @click="selectUserType" />
    </van-cell-group>
    <van-action-sheet
      v-model="userTypeShow"
      :actions="actions"
      :close-on-click-overlay="false"
      cancel-text="取消"
      description="您好，此操作选择后不可再更改，请慎重选择"
      close-on-click-action
      @select="onSelect"
      @cancel="onClose"
    />
    <van-button type="warning" @click="cancelAccount">注销账户</van-button>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import uploadAvatar from '@/components/UploadAvatar'
import { getUserInfo, cancelAccount, editUserInfo } from '@/api/user'
export default {
  name: 'PersonalData',
  components: { uploadAvatar },
  data: () => ({
    defaultAvatar: require('@/assets/img/user/my/user.svg'),
    avatarUrl: '',
    headerTitle: '个人资料',
    email: '',
    name: '',
    mobile: '',
    userCode: '',
    nickname: '',
    userDetail: {},
    isHasPassword: false,
    isHasPaymentPassword: false,
    userTypeShow: false,
    actions: [
      {
        type: '1',
        name: '个人',
        subname: '充值与开票将展示个人信息'
      },
      {
        type: '2',
        name: '企业',
        subname: '充值与开票将展示公司信息'
      }
    ],
    baseUrl: ''
  }),
  mounted() {
    this.getPersonal()
    this.init()
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
    refreshData() {
      this.getPersonal()
    },
    cancelAccount() {
      Dialog.confirm({
        title: '确认注销账户 ？',
        message: '删除您的阿宝云账户，用户数据将无法恢复'
      }).then(() => {
        cancelAccount(localStorage.getItem('userCode')).then(res => {
          Toast('注销成功')
          localStorage.clear()
          this.$router.replace('/')
        })
      }).catch(() => {
        // on cancel
      })
    },
    editPaymentPwd() {
      this.$router.push({
        name: 'editpaymentPwd',
        query: {
          operation: this.isHasPaymentPassword ? 'edit' : 'set'
        }
      })
    },
    selectUserType() {
      if (!this.userDetail.user_type.length) {
        this.userTypeShow = true
      }
    },
    onSelect(item) {
      Dialog.confirm({
        title: `确认选择${item.name}用户？`,
        message: '此操作选择后不可再更改，请慎重选择'
      }).then(() => {
        const params = {
          user_code: localStorage.getItem('userCode'),
          user_type: item.type
        }
        editUserInfo(params).then(res => {
          this.getPersonal()
          Toast(res.data.msg)
        })
        // on confirm
      }).catch(() => {
        // on cancel
      })
    },
    onClose() {
      this.userType = ''
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
        this.isHasPaymentPassword = !!this.userDetail.payment_code
        if (response.data.data.head_photo !== '' && response.data.data.head_photo) {
          this.avatarUrl = `${this.baseUrl}${response.data.data.head_photo}`
        } else {
          this.avatarUrl = this.defaultAvatar
        }
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
