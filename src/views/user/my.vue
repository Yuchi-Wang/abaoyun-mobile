<template>
  <div class="my-main">
    <div class="user-area">
      <img src="../../assets/img/user/my/user.svg" @click="handleView">
      <span v-if="userName">{{ userName }}</span>
      <span v-if="!userToken" @click="login">立即登录</span>
    </div>
    <div class="user-fuction">
      <van-row>
        <van-col
          v-for="item in userFunctionList"
          :key="item.id"
          span="6"
          @click="getDetail(item.path)"
        >
          <van-badge v-if="item.title === '消息' && notRead" :content="notRead">
            <div class="user-list-bg" :style="{backgroundImage: 'url('+ item.src +')'}" />
          </van-badge>
          <div v-else class="user-list-bg" :style="{backgroundImage: 'url('+ item.src +')'}" />
          <p>{{ item.title }}</p>
        </van-col>
      </van-row>
    </div>
    <van-cell-group>
      <van-cell title="个人资料" :border="false" is-link @click="handleView" />
      <van-cell title="我的服务" :border="false" is-link @click="handleViewService" />
      <van-cell title="常见问题" :border="false" is-link @click="handleViewQuestion" />
      <van-cell title="关于我们" :border="false" is-link @click="handleViewUs" />
    </van-cell-group>
    <van-button v-if="userToken" type="warning" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  data: () => ({
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
        src: require('@/assets/img/user/my/invoice.svg'),
        title: '发票',
        path: '/invoice-list'
      }
    ],
    userName: '',
    userToken: '',
    notRead: 0
  }),
  mounted() {
    this.getPersonal()
  },
  methods: {
    handleView() {
      this.$router.push('/personal-data')
    },
    handleViewUs() {
      this.$router.push('/about-us')
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
        })
      }
    },
    login() {
      this.$router.replace('/login')
    },
    handleViewQuestion() {
      this.$router.push('/common-question')
    },
    getDetail(path) {
      this.$router.push(path)
    },
    handleViewService() {
      this.$router.push('/service-list')
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
  padding: 4rem 1rem 0;
  .user-area {
    padding: 0 1rem 0;
    img {
      width: 4.167rem;
      vertical-align: middle;
      margin-right: .75rem;
    }
    span {
      vertical-align: middle;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000000;
      line-height: 1.1667rem;
    }
  }
  .user-fuction {
    width: 100%;
    height: 7.75rem;
    margin-top: 1.75rem;
    border-radius: .667rem;
    background:linear-gradient(to bottom,#434659 50%,#393C4C 50%);
    .van-row {
      display: flex;
      height: 7.75rem;
      align-items:center;
      .van-col {
        text-align: center;
        /deep/ .van-badge {
          border: 1px solid #ee0a24;
        }
        /deep/.van-badge--fixed {
          top: .2rem;
          right: .2rem;
        }
        .user-list-bg {
          width: 3.333rem;
          height: 3.333rem;
          background-repeat: no-repeat;
          background-size: cover;
          margin: auto;
        }
        p {
          color: #FFFFFF;
          font-weight: 400;
          line-height: 1.4167rem;
          margin-top: .583rem;
        }
      }
    }
  }
  .van-cell-group {
    margin-top: 1.25rem;
    border-radius: .667rem;
    .van-cell {
      border-radius: .667rem;
    }
  }
}
.van-button {
  display: block;
  margin: 2rem auto 0;
  background: #EE0A24;
  border: 1px solid #EE0A24;
  width: 22rem;
  border-radius: .833rem;
}
</style>
