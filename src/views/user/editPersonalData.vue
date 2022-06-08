<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-field v-if="routerQueryType === 'name'" v-model="value" :label="label" :placeholder="'请输入'+ label" maxlength="16" clearable />
      <van-field v-else v-model="value" :label="label" :placeholder="'请输入'+ label" maxlength="50" clearable />
    </van-cell-group>
    <van-button round type="info" @click="save">保存</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { editUserInfo, getUserInfo } from '@/api/user'
export default {
  name: 'EditPersonalData',
  data: () => ({
    headerTitle: '',
    routerQueryType: '',
    value: '',
    label: '',
    email: '',
    emailTest: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    userDetail: {}
  }),
  mounted() {
    this.getPersonal()
  },
  methods: {
    getPersonal() {
      const params = {
        user_code: localStorage.getItem('userCode')
      }
      getUserInfo(params).then(response => {
        this.userDetail = response.data.data
      }).finally(() => {
        this.judgeTitle()
      })
    },
    judgeTitle() {
      this.routerQueryType = this.$route.query.type
      switch (this.routerQueryType) {
        case 'name':
          this.headerTitle = '修改昵称'
          this.label = '昵称'
          this.value = this.userDetail.nickname
          break
        case 'email':
          this.headerTitle = '绑定邮箱'
          this.label = '邮箱'
          this.value = ''
          break
        case 'addr':
          this.headerTitle = '修改地址'
          this.label = '所在地'
          this.value = this.userDetail.adress
          break
      }
    },
    save() {
      if (this.routerQueryType === 'name') {
        if (!this.value) {
          Toast.fail('请输入昵称')
        } else {
          editUserInfo({
            user_code: localStorage.getItem('userCode'),
            nickname: this.value
          }).then(res => {
            if (res.data.code === 200) {
              Toast(res.data.msg)
              this.$router.replace('/personal-data')
            }
          })
        }
      } else if (this.routerQueryType === 'addr') {
        if (!this.value) {
          Toast.fail('请输入地址')
        } else {
          editUserInfo({
            user_code: localStorage.getItem('userCode'),
            adress: this.value
          }).then(res => {
            if (res.data.code === 200) {
              Toast(res.data.msg)
              this.$router.replace('/personal-data')
            }
          })
        }
      } else if (this.routerQueryType === 'email') {
        if (!this.value) {
          Toast.fail('请输入邮箱号')
        } else if (!this.emailTest.test(this.value)) {
          Toast.fail('邮箱格式不对')
        } else {
          this.$router.push({
            name: 'vcCode',
            query: {
              type: 'email',
              operation: 'confirmBinding',
              num: this.value,
              redirect: '/personal-data'
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.van-cell-group {
  margin: .833rem;
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
