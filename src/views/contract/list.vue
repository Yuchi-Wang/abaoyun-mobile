<template>
  <div class="doc-main">
    <div class="contract-header">
      <i class="turn-back-icon" @click="turnBack" />
      <van-field
        v-model="value"
        maxlength="25"
        placeholder="请输入合同关联的订单号"
      />
    </div>
    <div class="main-list">
      <van-pull-refresh v-if="contractList.length" v-model="isRefreshLoading" @refresh="onRefresh" style="min-height: 100vh;">
        <van-list
          v-model="listLoading"
          :finished="listFinished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-swipe-cell
            v-for="(item, index) in contractList"
            :key="item.id"
            :name="index"
            :before-close="beforeClose"
          >
            <div class="list" @click="getDetail(item.contract_Id)">
              <van-row>
                <van-col span="20">
                  <p class="contract-no">关联订单号:{{ item.order_number }}</p>
                  <h4 class="name">{{ item.contract_name }}</h4>
                  <p class="validity">申请时间</p>
                  <p class="validity-date">{{ item.createtime.substring(0, item.createtime.length - 5) }}</p>
                </van-col>
                <van-col span="4">
                  <span
                    class="contract-status"
                    :style="{'color': (item.status === '1' ? '#FF0000':'#2F88FF')}"
                  >
                    {{ item.status | contractStatusFilter }}
                  </span>
                </van-col>
              </van-row>
            </div>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </van-list>
      </van-pull-refresh>
      <van-empty v-if="emptyShow" description="暂无合同信息" />
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import { getList, deleteContract } from '@/api/contract'
const contractStatusMap = {
  '0': '申请成功',
  '1': '未通过',
  '2': '已撤销',
  '3': '申请中',
  '4': '已作废'
}
export default {
  name: 'ContractList',
  filters: {
    contractStatusFilter: status => contractStatusMap[status]
  },
  data: () => ({
    value: '',
    count: 0,
    isRefreshLoading: false,
    listLoading: false,
    listFinished: false,
    isReflash: false,
    hasNextPage: false,
    pageIndex: 1,
    pageSize: 8,
    emptyShow: false,
    contractStatusMap,
    contractList: []
  }),
  watch: {
    value() {
      this.pageIndex = 1
      this.contractList = []
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
            this.contractList = this.contractList.concat(responseData.list)
          } else {
            this.contractList = responseData.list
          }
          this.hasNextPage = responseData.hasNextPage
        } else {
          this.listFinished = true
          this.emptyShow = true
        }
      })
    },
    onLoad() {
      if (this.isRefreshLoading) {
        this.contractList = []
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
    getDetail(id) {
      this.$router.push({
        name: 'contractDetail',
        query: {
          id: id
        }
      })
    },
    onRefresh() {
      this.isReflash = false
      setTimeout(() => {
        this.contractList = []
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
            const deteleId = this.contractList[name].contract_Id
            deleteContract({ contract_Id: deteleId }).then(res => {
              Toast(res.data.msg)
              this.contractList.splice(name, 1)
              if (this.contractList.length === 0) {
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
.contract-header {
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
.van-swipe-cell {
  margin: .8333rem;
  background: #fff;
  border-radius: .667rem;
  -webkit-overflow-scrolling: touch;
}
.list {
  padding: 1.083rem 1.667rem 1.25rem 1.25rem;
  .contract-no {
    width: 100%;
    margin-bottom: .667rem;
    height: 1.4167rem;
    line-height: 1.4167rem;
    font-size: 1rem;
    font-weight: 400;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .name {
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 1.25rem;
    font-size: 1.4167rem;
    font-weight: 600;
    color: #323A44;
  }
  .contract-status {
    display: inline-block;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    background: #F9F9F8;
    border-radius: 1.4167rem;
    text-align: center;
    padding: 0 .5rem;
  }
  .validity {
    margin-bottom: .5rem;
    color: #868686;
  }
}
.delete-button {
  height: 100%;
  border-top-right-radius: .667rem;
  border-bottom-right-radius: .667rem;
}
.apply {
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 20.8333rem;
  background: #3C51FF;
  color: #fff;
  border-radius: 1.667rem;
  font-size: 1.167rem;
}
</style>

