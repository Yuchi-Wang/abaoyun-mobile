<template>
  <div>
    <div class="banner">
      <h3>产品推荐</h3>
    </div>
    <div class="main">
      <div class="top-product">
        <van-row>
          <van-col v-for="(item, index) in recommendList" :key="item.id" span="12">
            <img :src="item.src" @click="getDetail(item.productId, index)">
          </van-col>
        </van-row>
      </div>
      <div class="security">
        <h3 class="security-title">安全验证</h3>
        <van-row gutter="6">
          <van-col v-for="item in securityList" :key="item.id" span="12">
            <div class="security-list">
              <div class="security-list-bg" :style="{backgroundImage: 'url('+ item.src +')'}" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="security">
        <h3 class="voice-title">智能语音</h3>
        <van-row gutter="6">
          <van-col v-for="item in voiceList" :key="item.id" span="12">
            <div class="security-list">
              <div class="security-list-bg" :style="{backgroundImage: 'url('+ item.src +')'}" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/product'
export default {
  name: 'ProductList',
  data: () => ({
    recommendList: [
      { id: 1, src: require('@/assets/img/product/finance.png'), productId: '' },
      { id: 2, src: require('@/assets/img/product/abao.png'), productId: '' }
    ],
    securityList: [
      {
        id: 1,
        src: require('@/assets/img/product/people.svg'),
        title: '人脸识别',
        content: '人脸验证、识别'
      },
      {
        id: 2,
        src: require('@/assets/img/product/voice.svg'),
        title: '声纹验证',
        content: '声纹录制、验证'
      }
    ],
    voiceList: [
      {
        id: 1,
        src: require('@/assets/img/product/listen.svg'),
        title: '语音听写',
        content: '语音识别、录入'
      },
      {
        id: 2,
        src: require('@/assets/img/product/words.svg'),
        title: '文字转语音',
        content: '语音转换'
      }
    ]
  }),
  mounted() {
    this.getProductList()
  },
  methods: {
    getProductList() {
      const params = {
        pageIndex: 1,
        pageSize: 10
      }
      getList(params).then(res => {
        const productidList = res.data.data.list.map(item => {
          return item.product_Id
        })
        for (let i = 0; i < productidList.length; i++) {
          this.recommendList[i].productId = productidList[i]
        }
      })
    },
    getDetail(id, index) {
      if (index === 0) {
        this.$router.push({
          name: 'nlpDetail',
          query: {
            id: id
          }
        })
      } else if (index === 1) {
        this.$router.push({
          name: 'abaoDetail',
          query: {
            id: id
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.switch-router {
  > div {
    background: #fff;
    height: 100%;
  }
}
.banner {
  background: url("../../assets/img/product/list-banner.jpg") no-repeat;
  height: 10rem;
  background-size: 100%;
  z-index: 1;
  padding: 3.4167rem 1.667rem 0;
  h3 {
    position: relative;
    height: 1.833rem;
    font-size: 1.333rem;
    font-weight: 600;
    color: #fff;
    line-height: 1.833rem;
    &:after {
      content: '';
      position: absolute;
      width: 2.5rem;
      height: .4167rem;
      background: #fff;
      left: 0;
      bottom: -.833rem;
      border-radius: .5rem;
    }
  }
}
.main {
  background: #fff;
  position: relative;
  .top-product {
    position: absolute;
    width: 100%;
    top: -1rem;
    height: 3rem;
    border-radius: 1.3rem 1.3rem 0 0;
    background: #fff;
    box-sizing: border-box;
     padding: 0 1rem;
    .van-row {
      position: absolute;
      left: 0;
      top: -3rem;
      padding: 0 1rem;
      img {
        width: 100%;
      }
    }
  }
}
.security {
  padding: 1rem 1rem 0 1rem;
  .security-title,.voice-title {
    position: relative;
    height: 2.333rem;
    line-height: 2.333rem;
    font-size: 1.333rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
    color: #000;
    &:after {
      content: '';
      position: absolute;
      width: 2.5rem;
      height: .4167rem;
      background: #404CFF;
      left:50%;
      transform: translateX(-50%);
      bottom: -.833rem;
      border-radius: .5rem;
    }
  }
  .security-title {
    margin-top: 3.5rem;
  }
  .security-list {
    padding: 1.5883rem 1rem 2.083rem 1.75rem;
    margin-top: 1rem;
    background: #F6F6F6;
    border-radius: .833rem;
    .security-list-bg {
      width: 3rem;
      height: 3rem;
      background-repeat: no-repeat;
      background-size: contain;
      position: absolute;
    }
    h3 {
      margin: 0 0 .167rem 3.667rem;
      height: 1.667rem;
      line-height: 1.667rem;
      font-size: 1.167rem;
      font-weight: 600;
      text-align: left;
      color: #000;
    }
    p {
      margin-left: 3rem;
      font-size: 1rem;
      font-weight: 600;
      color: #7B7B7B;
      line-height: 14px;
      transform: scale(.833, .8);
    }
  }
}
</style>
