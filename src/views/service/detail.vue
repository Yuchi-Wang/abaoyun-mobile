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
      <li v-for="(item, index) in sdkapiList" :key="item.id">
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
            <span @click="getSdkDoc(index)">技术文档</span>
          </van-col>
        </van-row>
      </li>
    </ul>
    <div class="download_chat">
      <h4>历史聊天记录下载</h4>
      <van-cell-group :border="false">
        <van-cell title="请选择开始时间" :value="startDate" :border="false" is-link @click="startShow = true" />
        <van-cell title="请选择结束时间" :value="endDate" :border="false" is-link @click="endShow = true" />
      </van-cell-group>
      <van-button class="down-button" @click="downChatList">下载</van-button>
    </div>
    <van-popup v-model="dataShow" position="bottom">
      <van-picker
        title="选择查看时间范围"
        show-toolbar
        :columns="dataList"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 开始时间 -->
    <van-popup v-model="startShow" position="bottom">
      <van-datetime-picker
        v-model="currentStartDate"
        type="datetime"
        :min-date="minStartDate"
        :max-date="maxStartDate"
        title="选择开始时间"
        show-toolbar
        @confirm="onStartConfirm"
        @cancel="onStartCancel"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup v-model="endShow" position="bottom">
      <van-datetime-picker
        v-model="currentEndDate"
        type="datetime"
        :min-date="minEndDate"
        :max-date="maxEndDate"
        title="选择开始时间"
        show-toolbar
        @confirm="onEndConfirm"
        @cancel="onEndCancel"
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
import { getChatStatistics, getServiceModeList, getChatExcelList } from '@/api/service'
export default {
  name: 'ServiceDetail',
  data: () => ({
    headerTitle: '服务详情',
    dateText: '周',
    dateValue: '1',
    dataList: [
      {
        value: '1',
        text: '周'
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
    countList: [],
    startDate: '',
    endDate: '',
    minStartDate: new Date(2020, 0, 1),
    maxStartDate: new Date(),
    currentStartDate: new Date(),
    minEndDate: new Date(2020, 0, 1),
    maxEndDate: new Date(),
    currentEndDate: new Date(),
    endShow: false,
    startShow: false
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
        this.dateList = res.data.data.aBaoService.map(item => item.date.replace(/\b(0+)/gi, ''))
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
    onStartCancel() {
      this.startShow = false
    },
    onEndCancel() {
      this.endShow = false
    },
    addZero: num => ('00' + num).substr(('00' + num).length - 2, 2),
    dateFormat(date) {
      const year = date.getFullYear()
      const mouth = date.getMonth() + 1
      const dates = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      return year + '-' + this.addZero(mouth) + '-' + this.addZero(dates) + ' ' + this.addZero(hours) + ':' + this.addZero(minutes) + ':' + this.addZero(seconds)
    },
    onStartConfirm() {
      this.startDate = this.dateFormat(this.currentStartDate)
      this.startShow = false
    },
    onEndConfirm() {
      this.endDate = this.dateFormat(this.currentEndDate)
      this.endShow = false
    },
    getSdkDoc(index) {
      window.open(this.sdkapiList[index].adress)
    },
    downChatList() {
      const startTimeStr = this.currentStartDate.getTime()
      const endTimeStr = this.currentEndDate.getTime()
      if (startTimeStr > endTimeStr) {
        Toast('开始时间不能大于结束时间')
      } else {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        })
        const parmas = {
          user_code: localStorage.getItem('userCode'),
          start_time: this.startDate,
          end_time: this.endDate,
          pageIndex: 1,
          pageSize: 60000
        }
        getChatExcelList(parmas).then(res => {
          if (res.data) {
            this.handleFileStream(res.data)
            Toast.clear()
          } else {
            Toast('暂无记录')
          }
        })
      }
    },
    handleFileStream(fileStream) {
      const link = document.createElement('a')
      const blob = new Blob([fileStream], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.download = '聊天记录'
      document.body.appendChild(link)
      link.click()
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
.sdk-api,.download_chat {
  margin: .833rem;
  background: #fff;
  border-radius: .333rem;
  padding: 0 1rem;
  h4 {
    font-size: 1.167rem;
    margin-bottom: .4rem;
  }
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
.download_chat {
  padding: 1rem;
  .van-cell {
    padding: .1rem 0;
  }
  .van-cell__title {
    font-size: 1.1rem;
  }
}
.down-button {
  display: block;
  margin: 2rem auto 1rem;
  width: 8.333rem;
  height: 2.8rem;
  line-height: 2.8rem;
  background: #324BE3;
  border-color: #324BE3;
  border-radius: 2rem;
  font-size: 1.083rem;
  color: #fff;
}
</style>
