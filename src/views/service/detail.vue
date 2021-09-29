<template>
  <div class="service">
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
      <van-cell title="请选择查看时间" is-link :value="dateText" @click="dataShow = true" />
      <div id="myChart" :style="{width: '100%', height: '250px'}" />
    </div>
    <ul v-if="sdkapiList.length" class="sdk-api">
      <li v-for="item in sdkapiList" :key="item.id">
        <van-row>
          <van-col span="4">
            {{ item.type === '1' ? 'sdk' : 'api' }}
          </van-col>
          <van-col span="10">{{ item.interface_name }}</van-col>
          <van-col
            v-clipboard:copy="item.name"
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
    </ul>
    <van-popup v-model="dataShow" position="bottom">
      <van-picker
        title="选择查看时间范围"
        show-toolbar
        :columns="dataList"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
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
import { getChatStatistics, getServiceModeList } from '@/api/service'
export default {
  name: 'ServiceDetail',
  data: () => ({
    headerTitle: '服务详情',
    dateText: '日',
    dateValue: '1',
    dataList: [
      {
        value: '1',
        text: '日'
      },
      {
        value: '2',
        text: '月'
      },
      {
        value: '3',
        text: '年'
      }
    ],
    dataShow: false,
    serviceList: [
      {
        id: 1,
        src: require('@/assets/img/service/today.svg'),
        times: ''
      },
      {
        id: 2,
        src: require('@/assets/img/service/remain.svg'),
        times: ''
      }
    ],
    sdkapiList: [],
    dateList: [],
    countList: []
  }),
  mounted() {
    this.getChatStatistics()
    this.getServiceModeList()
  },
  methods: {
    drawLine() {
      const myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        tooltip: {
          formatter: '时间：{b} </br> 使用次数：{c}'
        },
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
          boundaryGap: false,
          data: this.dateList
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          data: this.countList,
          color: '#5C7BD9'
        }]
      })
    },
    getServiceModeList() {
      const parmas = {
        product_Id: this.$route.query.id,
        pageIndex: 1,
        pageSize: 20
      }
      getServiceModeList(parmas).then(res => {
        this.sdkapiList = res.data.data.list
      })
    },
    getChatStatistics() {
      const params = {
        values: this.dateValue,
        user_code: localStorage.getItem('userCode')
      }
      getChatStatistics(params).then(res => {
        this.serviceList[0].times = res.data.data.todayTime
        this.serviceList[1].times = res.data.data.surplusTime
        this.dateList = res.data.data.aBaoService.map(item => item.date.replace(/\b(0+)/gi,""))
        this.countList = res.data.data.aBaoService.map(item => item.count)
        this.drawLine()
      })
    },
    onCopy() {
      Toast('复制成功')
    },
    onError() {
      Toast('复制失败')
    },
    onConfirm(value) {
      this.dateText = value.text
      this.dateValue = value.value
      this.dataShow = false
      this.getChatStatistics()
    },
    onCancel() {
      this.dataShow = false
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
.service {
  padding-bottom: 2rem;
}
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
