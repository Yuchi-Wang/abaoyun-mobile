<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-field v-model="value" label="兑换码" :placeholder="'请输入兑换码'" maxlength="25" clearable />
    </van-cell-group>
    <van-button round type="info" @click="save">确 认</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getToken } from '@/utils/auth'
import { useRedeemCode } from '@/api/user'
export default {
  name: 'EditPersonalData',
  data: () => ({
    headerTitle: '使用兑换码',
    value: '',
    token: getToken()
  }),
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.token) {
        Toast('您好，请先登录')
        setTimeout(()=> {
          this.$router.replace({
            path: '/login',
            query: { redirect: this.$router.currentRoute.fullPath }
          })
        }, 1000)
      }
    },
    save() {
      if (this.value === '') {
        Toast('请输入兑换码')
      } else {
        const params = {
          cdkey: this.value.replace(/\s*/g, ''),
          user_code: localStorage.getItem('userCode')
        }
        useRedeemCode(params).then(res => {
          if (res.data.code === 200) {
            Toast('兑换成功')
            this.$router.replace('/my')
          }
        })
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
