<template>
  <div class="message-detail">
    <baseHeader :header-title="headerTitle" />
    <h4 v-if="noticeDetail.createtime">{{ noticeDetail.createtime.substring(0, noticeDetail.createtime.length - 2) }}</h4>
    <van-row>
      <van-col span="3">
        <div class="message-icon" />
      </van-col>
      <van-col span="20" class="message-content">
        <div class="triangle" />
        <div class="message-box">
          <p>{{ noticeDetail.content }}</p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getDetail } from '@/api/notice'
export default {
  name: 'NoticeDetail',
  data: () => ({
    detailId: -1,
    headerTitle: '公告详情',
    noticeDetail: {}
  }),
  mounted() {
    this.detailId = this.$route.query.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      const params = { notice_id: this.detailId }
      getDetail(params).then(res => {
        this.noticeDetail = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.switch-router {
 background: #fff;
}
h4 {
  text-align: center;
  margin-top: 1rem;
  height: 1.667rem;
  line-height: 1.667rem;
  font-size: 1.167rem;
  font-weight: 400;
  color: #B4B4B4;
}
.van-row {
  margin: 1rem;
  .message-icon {
    width: 3rem;
    height: 3rem;
    background: url('../../assets/img/user/my/message-detail.svg') no-repeat;
    background-size: contain;
  }
  .message-content {
    position: relative;
    .triangle{
      position: absolute;
      top: .8rem;
      left: -1.3rem;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-right: 10px solid #F4F4F4;
      border-left: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
    .message-box {
      padding: 1.4167rem 2rem;
      background: #F4F4F4;
      box-shadow: 0px 1px 2px 0px rgba(238, 238, 238, 0.5);
      border-radius: 7px;
      p {
        font-size: 1.167rem;
        line-height: 1.667rem;
      }
    }
  }
}
</style>
