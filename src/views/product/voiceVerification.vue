<template>
  <div class="product-main">
    <baseHeader :header-title="headerTitle" />
    <div class="banner">
      <h3>
        <span class="san" />
        <span class="part-title">PART01</span><br>
        <span class="main-title">产品简介</span>
      </h3>
      <p>
        实现声纹注册和声纹1:1、1:N 对比验证服务，对说话人的声波特征进行提取和验证辨识
      </p>
    </div>
    <div class="advantage">
      <h3>
        <span class="san" />
        <span class="part-title">PART02</span><br>
        <span class="main-title">产品优势</span>
      </h3>
      <ul>
        <li v-for="item in advantageList" :key="item.id">
          <h4>
            <i />
            {{ item.title }}
          </h4>
          <p>{{ item.content }}</p>
        </li>
      </ul>
    </div>
    <div class="scene">
      <div class="scene-banner">
        <h3>
          <span class="san" />
          <span class="part-title">PART03</span><br>
          <span class="main-title">应用场景</span>
        </h3>
        <h4>远程认证</h4>
        <p>
          在银行、证券和借贷等实名制和安全性要求较高的领域，可作为用户远程注册和密码找回环节中的辅助验证  
        </p>
        <h4>考勤系统</h4>
        <p>
          使用声纹识别结合其他生物识别进行考勤，成本较低，能有效防止代打卡现象。特别适合大规模流动性较高的群体的考勤
        </p>
      </div>
    </div>
    <div class="resources">
      <h3>
        <span class="san" />
        <span class="part-title">PART04</span><br>
        <span class="main-title">相关资源</span>
      </h3>
      <van-button round @click="getDoc">技术文档</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaceRecognition',
  data: () => ({
    headerTitle: '声纹验证',
    advantageList: [
      {
        id: 1,
        src: require('@/assets/img/product/advantage.svg'),
        title: '应用模式灵活',
        content: '进行声纹识别时，用户的说话内容可以随意说，无需和注册时语音相关，提升用户体验效果'
      },
      {
        id: 2,
        src: require('@/assets/img/product/advantage.svg'),
        title: '准确率高',
        content: '基于科大讯飞深厚的研究积累，提供业界领先的高准确率，帮助语音应用获得最佳安全性'
      },
      {
        id: 3,
        src: require('@/assets/img/product/advantage.svg'),
        title: '稳定可靠',
        content: '面向大规模应用，可提供动态负载均衡，并进一步提升系统的可用性，可管理性与可维护性'
      },
            {
        id: 4,
        src: require('@/assets/img/product/advantage.svg'),
        title: '接入方式简单',
        content: '支持WebAPI方式接入，具备轻量、跨平台支持等特点'
      }
    ]
  }),
  methods: {
    getDoc() {
      window.open(`${window.location.protocol}//${window.location.host}/docs/voiceprintRecognition/web.html`)
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-router {
  background: #fff;
}
.product-main {
  /deep/ .base-header {
    background: transparent!important;
    position: relative;
    z-index: 2;
    h3 {
      color: #fff;
    }
    .turn-back-icon {
      border-color: #fff
    }
  }
  .part-title {
    position: relative;
    z-index: 10;
  }
  .main-title {
    position: relative;
    z-index: 5;
  }
  .banner {
    background: url('../../assets/img/product/abao-detail-banner.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    width: 100%;
    height: 22.167rem;
    z-index: 1;
    padding: 0 3.1667rem;
    box-sizing: border-box;
    h3 {
      position: relative;
      font-size: 1.167rem;
      font-weight: 600;
      color: #fff;
      line-height: 1.667rem;
      text-align: center;
      width: 6rem;
      margin: 4rem auto 3rem;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        left: 0;
        top: .5rem;
      }
      .part-title {
        height: 1.667rem;
        line-height: 1.667rem;
      }
    }
    p {
      margin-top: 2rem;
      font-size: 1rem;
      font-weight: 400;
      color: #FFF;
      line-height: 1.4167rem;
    }
  }
  .advantage {
    margin-top: 18.5rem;
    background: #fff;
    padding-top: 1.583rem;
    h3 {
      position: relative;
      margin: 0 auto 2.667rem;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
      width: 6rem;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        left: 0;
        top: .5rem;
      }
      .part-title {
        color: #0008FF;
      }
    }
    ul {
      li {
        padding: 1.333rem 2.8333rem 1.333rem 2.583rem;
        &:nth-of-type(odd) {
          background: #F7F7F7;
        }
        h4 {
          height: 1.4167rem;
          line-height: 1.4167rem;
          margin-bottom: .833rem;
          font-size: 1rem;
          font-weight: 600;
          color: #000;
          i {
            display: inline-block;
            background: url('../../assets/img/product/advantage.svg') no-repeat;
            width: 1.5rem;
            height: 1.5rem;
            margin-right: .5rem;
            z-index: 1;
            background-size: contain;
            vertical-align: middle;
          }
        }
        p {
          font-weight: 400;
          color: #000;
          line-height: 1.4167rem;
        }
      }
    }
  }
  .scene {
    .scene-banner {
      background: url('../../assets/img/product/nlp-detail-banner.jpg') no-repeat;
      background-size: cover;
      width: 100%;
      height: 22rem;
      z-index: 1;
      padding: 1.5883rem 3.1667rem 0;
      box-sizing: border-box;
      h3 {
        position: relative;
        width: 6rem;
        font-size: 1.167rem;
        font-weight: 600;
        color: #fff;
        line-height: 1.667rem;
        text-align: center;
        margin: 0 auto 2rem;
        .san {
          position: absolute;
          background: url('../../assets/img/product/san.svg') no-repeat;
          width: 6rem;
          height: 6rem;
          z-index: 1;
          background-size: contain;
          left: 0;
          top: .5rem;
        }
      }
      h4 {
        margin-bottom: .833rem;
        height: 1.4167rem;
        line-height: 1.4167rem;
        font-size: 1rem;
        font-weight: 600;
        color: #FFFFFF;
      }
      p {
        font-size: 1rem;
        font-weight: 400;
        color: #FFF;
        line-height: 1.4167rem;
      }
    }
  }
  .resources {
    text-align: center;
    padding-top: 1.667rem;
    padding-bottom: 10rem;
    padding-left: 1.333rem;
    padding-right: 1.333rem;
    background: #fff;
    border-top: 1px dashed #E6E6E6;
    h3 {
      position: relative;
      font-size: 1.167rem;
      font-weight: 600;
      color: #000;
      line-height: 1.667rem;
      text-align: center;
      margin: 0 auto 3rem;
      width: 6rem;
      .san {
        position: absolute;
        background: url('../../assets/img/product/san.svg') no-repeat;
        width: 6rem;
        height: 6rem;
        z-index: 1;
        background-size: contain;
        left: 0;
        top: .5rem;
      }
      .part-title {
        color: #0008FF;
      }
    }
    .van-button {
      width: 19.083rem;
      height: 3.333rem;
      line-height: 3.333rem;
      background: #F2F3FF;
      border-color: #F2F3FF;
      border-radius: 20px;
      font-weight: 600;
      color: #324BE3;
    }
  }
}
</style>
