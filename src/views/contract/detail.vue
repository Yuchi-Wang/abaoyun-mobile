<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-cell title="合同状态" :border="false" :value="contractStatus" />
      <van-cell v-if="contractDetail.status === '1'" title="拒绝理由" :border="false" :value="contractDetail.reason" />
      <van-cell title="合同Id" :border="false" :value="contractDetail.contract_Id" />
      <van-cell title="关联订单号" :border="false" :value="contractDetail.order_number" />
       <van-cell v-if="contractDetail.contract_number" title="合同编码" :border="false" :value="contractDetail.contract_number" />
      <van-cell v-if="contractDetail.receiver" title="合同收件方" :border="false" :value="contractDetail.receiver" />
      <van-cell v-if="contractDetail.createtime" title="申请时间" :border="false" :value="contractDetail.createtime.substring(0, contractDetail.createtime.length - 5)" />
      <van-cell v-if="contractDetail.expirationdate" title="合同有效期" :border="false" :value="contractDetail.expirationdate" />
      <van-cell v-if="contractDetail.express_number && contractDetail.status !== '3'" title="回寄物流单号" :border="false" :value="contractDetail.express_number" />
      <van-field
        v-if="contractDetail.status === '3'"
        v-model="contractDetail.express_number"
        center
        clearable
        label="回寄物流单号"
        placeholder="请输入寄物流单号"
        maxlength="20"
      >
        <template #button>
          <van-button size="small" type="info" @click="submit">确认</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-button v-if="contractDetail.status === '0'" class="cancle-apply preview" @click="handleDownLoad">下载合同</van-button>
    <van-button v-if="contractDetail.status === '3'" class="cancle-apply" @click="cancleContract">撤销申请</van-button>
    <van-button v-if="contractDetail.status === '1'" class="cancle-apply" @click="createContract">再次申请</van-button>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import { getDetail, updateContract } from '@/api/contract'
const contractStatusMap = {
  '0': '申请成功',
  '1': '申请失败',
  '2': '已撤销',
  '3': '申请中'
}
export default {
  name: 'ContractDetail',
  data: () => ({
    detailId: -1,
    headerTitle: '合同详情',
    contractDetail: {},
    contractStatusMap,
    baseUrl: window.location.host
  }),
  computed: {
    contractStatus() {
      return this.contractStatusMap[this.contractDetail.status]
    }
  },
  mounted() {
    this.detailId = this.$route.query.id
    this.getDetail()
  },
  methods: {
    getDetail() {
      getDetail({ contract_Id: this.detailId }).then(res => {
        this.contractDetail = res.data.data
      })
    },
    submit() {
      updateContract(this.contractDetail).then(res => {
        if (res.data.code === 200) {
          Toast('回寄合同物流单号填写成功')
        }
      })
    },
    createContract() {
      Dialog.confirm({
        message: '确认再次申请该该合同吗'
      }).then(() => {
        this.contractDetail.status = '3'
        updateContract(this.contractDetail).then(res => {
          Toast(res.data.msg)
          this.$router.replace('/contract-list')
        })
      }).catch(() => {
        // on cancel
      })
    },
    cancleContract() {
      Dialog.confirm({
        message: '确认取消申请该该合同吗'
      }).then(() => {
        this.contractDetail.status = '2'
        updateContract(this.contractDetail).then(res => {
          Toast(res.data.msg)
          this.$router.replace('/contract-list')
        })
      }).catch(() => {
        // on cancel
      })
    },
    handleDownLoad() {
      const downLoadUrl = `http://${this.baseUrl}/v1/uploading/DownloadAndParseImages${this.contractDetail.contract_address}`
      window.location.href = downLoadUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group {
  margin: .8333rem;
  border-radius: .6667rem;
}
.cancle-apply,.edit-detail {
  display: block;
  margin:3.083rem auto 0;
  width: 20.8333rem;
  height: 3.333rem;
  line-height: 3.333rem;
  border-radius: 1.6667rem;
}
.preview {
  background: #3C51FF;
  border-color: #3C51FF;
  color: #fff;
}
.edit-detail {
  background: #3C51FF;
}
.invoice-price {
  color: #ee0a24;
  font-size: 1.25rem;
}
</style>
