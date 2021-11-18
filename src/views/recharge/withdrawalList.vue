<template>
  <div class="doc-main">
    <baseHeader :header-title="headerTitle" />
    <van-pull-refresh v-if="billList.length" v-model="isRefreshLoading" style="min-height: 100vh;" @refresh="onRefresh">
      <van-list
        v-model="listLoading"
        :finished="listFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-swipe-cell
          v-for="(item, index) in billList"
          :key="item.id"
          :name="index"
          :before-close="beforeClose"
        >
          <div class="list" @click="getDetail(item.check_id)">
            <van-row gutter="10">
              <van-col span="16">
                <p class="order-no">账单号：{{ item.check_id }}</p>
                <h4 class="name">申请提现</h4>
                <p class="people">
                  <span>申请时间</span>
                  {{ item.createtime.substring(0, item.createtime.length - 2) }}
                </p>
              </van-col>
              <van-col span="8">
                <p class="bill-status">资金状态:{{ item.check_status | statusFilter }}</p>
                <p class="order-price">提现金额（元）</p>
                <h4 class="price">{{ item.money }}</h4>
              </van-col>
            </van-row>
          </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
    <van-empty v-if="emptyShow" description="暂无相关提现记录" />
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import { getList, deleteCheck } from '@/api/check'
const statusMap = {
  '1': '审核中',
  '2': '未通过',
  '3': '已通过'
}
export default {
  name: 'WithdrawalList',
  filters: {
    statusFilter: status => statusMap[status]
  },
  data: () => ({
    headerTitle: '提现记录',
    isRefreshLoading: false,
    listLoading: false,
    listFinished: false,
    billList: [],
    isReflash: false,
    hasNextPage: false,
    pageIndex: 1,
    pageSize: 9,
    emptyShow: false
  }),
  mounted() {
    this.getBillList()
  },
  methods: {
    turnBack() {
      if (this.$fromUrl.name === null) {
        this.$router.replace('/')
      } else {
        this.$router.back()
      }
    },
    getBillList() {
      const params = {
        pageIndex: this.pageIndex,
        user_code: localStorage.getItem('userCode'),
        pageSize: this.pageSize,
        type: '2'
      }
      getList(params).then(res => {
        this.isReflash = true
        this.listLoading = false
        const responseData = res.data.data
        if (responseData && responseData.list.length) {
          this.emptyShow = false
          if (this.pageIndex !== 1) {
            this.billList = this.billList.concat(responseData.list)
          } else {
            this.billList = responseData.list
          }
          this.hasNextPage = responseData.hasNextPage
        } else {
          this.listFinished = true
          this.emptyShow = true
        }
      })
    },
    getDetail(id) {
      this.$router.push({
        name: 'rechargeBillDetail',
        query: {
          id: id
        }
      })
    },
    onLoad() {
      if (this.isRefreshLoading) {
        this.billList = []
        this.isRefreshLoading = false
      } else {
        if (this.hasNextPage) {
          setTimeout(() => {
            this.pageIndex++
            this.getBillList()
          }, 500)
        } else {
          this.listLoading = false
          this.listFinished = true
        }
      }
    },
    onRefresh() {
      this.isReflash = false
      setTimeout(() => {
        this.billList = []
        this.pageIndex = 1
        this.isRefreshLoading = false
        this.listFinished = false
        this.getBillList()
      }, 1000)
      setTimeout(() => {
        this.isReflash ? Toast('刷新成功') : Toast('刷新失败')
      }, 1500)
    },
    beforeClose({ name, position, instance }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            const checkId = this.billList[name].check_id
            deleteCheck({ check_id: checkId }).then(res => {
              Toast('删除账单信息成功')
              this.billList.splice(name, 1)
              if (this.billList.length === 0) {
                this.emptyShow = true
              }
            })
            instance.close()
          }).catch(() => {
            // on cancel
          })
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.order-header {
  position: relative;
  text-align: center;
  background: #fff;
  /deep/ .van-cell {
      padding-left: 3.333rem;
      padding-right: 2.333rem;
      line-height: 2.5rem;
      .van-field__control {
        background: #F0F0F0;
        border-radius: 1.333rem;
        padding-left: 1.583rem;
      }
  }
  .turn-back-icon {
    position: absolute;
    z-index: 99;
    display: inline-block;
    left: 2rem;
    top: 50%;
    margin-top: -0.583rem;
    content: "";
    display: inline-block;
    height: 1rem;
    width: 1rem;
    border-width: 0 0 2px 2px;
    border-color: #7D7D7D;
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  }
}
.van-pull-refresh {
  min-height:  calc(100% - 4.13rem);
}
.van-swipe-cell {
  margin: .8333rem;
  background: #fff;
  border-radius: .667rem;
  -webkit-overflow-scrolling: touch;
}
.list {
  padding: 1.083rem 1.25rem 1.25rem 1.25rem;
  .order-no, .order-price {
    margin-bottom: .667rem;
    height: 1.4167rem;
    line-height: 1.4167rem;
    font-size: 1rem;
    font-weight: 400;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .name {
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 1.25rem;
    font-size: 1.4167rem;
    font-weight: 600;
    color: #323A44;
  }
  .bill-status {
    margin-bottom: 1rem;
    height: 1.4167rem;
    line-height: 1.4167rem;
  }
  .order-price {
      margin-bottom: .15rem;
  }
  .price {
    height: 38px;
    font-size: 27px;
    font-weight: 600;
    color: #5269FF;
    line-height: 38px;
  }
  .people {
    span {
      display: inline-block;
      margin-right: .5rem;
      color: #868686;
    }
  }
}
.delete-button {
  height: 100%;
  border-top-right-radius: .667rem;
  border-bottom-right-radius: .667rem;
}
</style>
