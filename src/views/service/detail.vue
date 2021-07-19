<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="service-detail">
      <van-row :gutter="7">
        <van-col
          v-for="item in serviceList"
          :key="item.id"
          span="12"
        >
          <div class="time-list">
            <p>
              <span>{{ item.times }}</span>次
            </p>
            <img :src="item.src">
          </div>
        </van-col>
      </van-row>
      <div id="myChart" :style="{width: '100%', height: '250px'}" />
    </div>
    <p class="appid">
      APP ID 123123123123132
    </p>
    <ul class="sdk-api">
      <li>
        <van-row>
          <van-col span="4">SDK</van-col>
          <van-col span="10">{{ sdkUrl }}</van-col>
          <van-col
            v-clipboard:copy="sdkUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            span="4"
            class="copy"
          >
            复制
          </van-col>
          <van-col span="6" class="doc">
            <span @click="getSdkDoc">技术文档</span>
          </van-col>
        </van-row>
      </li>
      <li>
        <van-row>
          <van-col span="4">API</van-col>
          <van-col span="10">{{ apiUrl }}</van-col>
          <van-col
            v-clipboard:copy="apiUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            span="4"
            class="copy"
          >
            复制
          </van-col>
          <van-col span="6" class="doc">
            <span @click="getApiDoc">技术文档</span>
          </van-col>
        </van-row>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/visualMap')
export default {
  name: 'ServiceDetail',
  data: () => ({
    headerTitle: '服务详情',
    serviceList: [
      {
        id: 1,
        src: require('@/assets/img/service/today.svg'),
        times: '500'
      },
      {
        id: 2,
        src: require('@/assets/img/service/remain.svg'),
        times: '500'
      }
    ],
    sdkUrl: 'sdkxxxxxxxxxxxx',
    apiUrl: 'apixxxxxxxxxxxx'
  }),
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      const myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {},
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 60
        }],
        title: {
          text: '服务使用情况统计',
          left: 'center',
          textStyle: {
            fontSize: '14',
            lineHeight: 30
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          data: [5, 20, 36, 10, 10, 20, 30],
          color: '#5C7BD9'
        }]
      })
    },
    onCopy() {
      Toast('复制成功')
    },
    onError() {
      Toast('复制失败')
    },
    getSdkDoc() {
      this.$router.push('/abao-doc')
    },
    getApiDoc() {
      this.$router.push('/nlp-doc')
    }
  }
}
</script>

<style lang="scss" scoped>
.service-detail {
  background: #fff;
  margin: .8333rem;
  padding-top: 1rem;
  box-sizing: border-box;
  border-radius: .333rem;
  .van-row {
    margin: 0 .833rem;
    padding-bottom: 1.333rem;
    border-bottom: 1px solid #d5d5d5;
    .van-col{
      &:nth-of-type(1) {
        p {
          background: linear-gradient(180deg, #0E5FF4 0%, #706AFC 50%, #9C6FFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      &:nth-of-type(2) {
        p {
          color: #5D5D5D;
        }
      }
    }
    .time-list {
      position: relative;
      height: 5.333rem;
      background: #F7F7F7;
      text-align: center;
      p {
        font-size: 1rem;
        span {
          font-size: 2.333rem;
          font-weight: 600;
          line-height:  5.333rem;
        }
      }
      img {
        position: absolute;
        right: 0;
        top: -.8rem;
      }
    }
  }
}
.appid {
  margin: .833rem;
  background: #fff;
  height: 3.1667rem;
  line-height: 3.1667rem;
  border-radius: .333rem;
  padding: 0 1rem;
  font-size: 1.167rem;
}
.sdk-api {
  margin: .833rem;
  background: #fff;
  border-radius: .333rem;
  padding: 0 1rem;
  font-size: 1.167rem;
  li {
    height: 3.667rem;
    line-height: 3.667rem;
    .copy {
      font-size: 1rem;
      color: #2143F2;
    }
    .doc {
      display: inline-block;
      margin-top: .75rem;
      width: 6.5rem;
      height: 2.1667rem;
      line-height: 2.1667rem;
      background: #F4F4F4;
      text-align: center;
      font-size: 1rem;
      border-radius: 1rem;
      color: #505050;
    }
  }
}
</style>
