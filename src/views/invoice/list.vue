<template>
  <div class="doc-main">
    <div class="invoice-header">
      <i class="turn-back-icon" @click="turnBack" />
      <van-field v-model="value" maxlength="25" placeholder="请输入发票关联的订单号" />
    </div>
    <van-pull-refresh v-if="invoiceList.length" v-model="isRefreshLoading" style="min-height: 100vh;" @refresh="onRefresh">
      <van-list
        v-model="listLoading"
        :finished="listFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-swipe-cell
          v-for="(item, index) in invoiceList"
          :key="item.id"
          :name="index"
          :before-close="beforeClose"
        >
          <div class="list" @click="getDetail(item.id)">
            <van-row>
              <van-col span="16">
                <p class="invoice-no">发票类型:{{ item.invoice_type === 1 ? '个人' : '企业' }}</p>
                <h4 class="name">{{ item.invoice_name }}</h4>
                <p class="people">
                  <span>申请时间</span>
                  {{ item.createtime.substring(0, item.createtime.length - 2) }}
                </p>
              </van-col>
              <van-col span="8">
                <p class="invoice-status">发票状态:{{ item.status | invoiceStatusFilter }}</p>
                <p class="invoice-price">发票金额（元）</p>
                <h4 class="price">{{ item.invoice_amount }}</h4>
              </van-col>
            </van-row>
          </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
    <van-empty v-if="emptyShow" description="暂无发票消息" />
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import { getList, deleteInvoice } from '@/api/invoice'
const invoiceStatusMap = {
  '1': '已申请',
  '2': '申请成功',
  '3': '已撤销',
  '4': '申请失败',
  '5': '已作废'
}
export default {
  name: 'InvoiceList',
  filters: {
    invoiceStatusFilter: status => invoiceStatusMap[status]
  },
  data: () => ({
    value: '',
    count: 0,
    isRefreshLoading: false,
    listLoading: false,
    listFinished: false,
    invoiceStatusMap,
    invoiceList: [],
    isReflash: false,
    hasNextPage: false,
    pageIndex: 1,
    pageSize: 8,
    emptyShow: false
  }),
  watch: {
    value() {
      this.pageIndex = 1
      this.invoiceList = []
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    turnBack() {
      if (this.$fromUrl.name === null) {
        this.$router.replace('/')
      } else {
        this.$router.back()
      }
    },
    onLoad() {
      if (this.isRefreshLoading) {
        this.invoiceList = []
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
        user_code: localStorage.getItem('userCode'),
        pageSize: this.pageSize,
        order_number: this.value
      }
      getList(params).then(res => {
        this.isReflash = true
        this.listLoading = false
        const responseData = res.data.data
        if (responseData && responseData.list.length) {
          this.emptyShow = false
          if (this.pageIndex !== 1) {
            this.invoiceList = this.invoiceList.concat(responseData.list)
          } else {
            this.invoiceList = responseData.list
          }
          this.hasNextPage = responseData.hasNextPage
        } else {
          this.listFinished = true
          this.emptyShow = true
        }
      })
    },
    getDetail(index) {
      this.$router.push({
        name: 'invoiceDetail',
        query: {
          id: index
        }
      })
    },
    onRefresh() {
      this.isReflash = false
      setTimeout(() => {
        this.invoiceList = []
        this.pageIndex = 1
        this.isRefreshLoading = false
        this.listFinished = false
        this.getList()
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
            const deteleId = this.invoiceList[name].id
            deleteInvoice({ id: deteleId }).then(res => {
              Toast(res.data.msg)
              this.invoiceList.splice(name, 1)
              if (this.invoiceList.length === 0) {
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
.invoice-header {
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
  padding: 1.083rem 1.667rem 1.25rem 1.25rem;
  .invoice-no, .invoice-price {
    margin-bottom: .667rem;
    height: 1.4167rem;
    line-height: 1.4167rem;
    font-size: 1rem;
    font-weight: 400;
  }
  .name {
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 1.25rem;
    font-size: 1.4167rem;
    font-weight: 600;
    color: #323A44;
  }
  .invoice-price {
      margin-bottom: .15rem;
  }
  .invoice-status {
     margin-bottom: 1.333rem;
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

