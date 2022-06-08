<template>
  <div class="doc-main">
    <baseHeader :header-title="headerTitle" />
    <van-pull-refresh v-if="serviceList.length" v-model="isRefreshLoading" @refresh="onRefresh" style="min-height: 100vh;">
      <van-list
        v-model="listLoading"
        :finished="listFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in serviceList"
          :key="item.id"
          :name="index"
          :before-close="beforeClose"
        >
          <div class="list">
            <van-row>
              <van-col span="12">
                <h4 class="service-title">{{ item.name }}</h4>
              </van-col>
              <van-col span="6" style="text-align: right">
                <van-button type="primary" @click="useService" class="use-button">使用</van-button>
              </van-col>
              <van-col span="6" style="text-align: center">
                <van-button type="info" @click="getDetail(item.product_id)">详情</van-button>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <van-empty v-if="emptyShow.length" description="暂无服务信息" />
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import { getList } from '@/api/service'
export default {
  name: 'ServiceList',
  data: () => ({
    headerTitle: '应用服务',
    count: 0,
    isReflash: false,
    isRefreshLoading: false,
    listLoading: false,
    listFinished: false,
    pageIndex: 1,
    pageSize: 8,
    serviceList: [],
    hasNextPage: false,
    emptyShow: false
  }),
  mounted() {
    this.getList()
  },
  methods: {
    onLoad() {
      if (this.isRefreshLoading) {
        this.serviceList = []
        this.isRefreshLoading = false
      } else {
        if (this.hasNextPage) {
          setTimeout(() => {
            this.pageIndex++
            this.getList()
          }, 500)
        } else {
          this.listLoading = false
          this.listFinished = true
        }
      }
    },
    getList() {
      const params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        user_code: localStorage.getItem('userCode')
      }
      getList(params).then(res => {
        this.isReflash = true
        this.listLoading = false
        const responseData = res.data.data
        if (responseData && responseData.list.length) {
          for (let i = 0; i < responseData.list.length; i++) {
            this.serviceList.push(responseData.list[i])
          }
          this.hasNextPage = responseData.hasNextPage
        } else {
          this.listFinished = true
        }
      }).finally(() => {
        if (!this.serviceList.length) {
          this.emptyShow = true
        }
      })
    },
    getDetail(id) {
      this.$router.push({
        name: 'serviceDetail',
        query: {
          id: id
        }
      })
    },
    onRefresh() {
      this.isReflash = false
      setTimeout(() => {
        this.serviceList = []
        this.pageIndex = 1
        this.isRefreshLoading = false
        this.listFinished = false
        this.getList()
      }, 1000)
      setTimeout(() => {
        this.isReflash ? Toast('刷新成功') : Toast('刷新失败')
      }, 1500)
    },
    useService() {
      this.$router.push({
        name: 'serviceDemo'
      })
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
            console.log(name)
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
.van-pull-refresh {
  overflow: visible;
  margin-top: .833rem;
  border-radius: .667rem;
}
.van-list {
  margin: 0 .8333rem;
}
.van-cell {
  background: #fff;
  -webkit-overflow-scrolling: touch;
}
.van-row {
  display: flex;
  align-items: center;
}
.list {
  .service-title {
    height: 2rem;
    line-height: 2rem;
    margin-bottom: .25rem;
    font-size: 1.333rem;
    color: #323A44;
  }
  .van-button {
    width: 5rem;
    height: 2rem;
    font-size: 1rem;
    background: linear-gradient(220deg, #183FEE 0%, #3C51FF 100%);
    border-color: #183FEE;
    border-radius: 1rem;
  }
  .use-button {
    background: #07C160;
    border-color: #07C160;
  }
}
</style>

