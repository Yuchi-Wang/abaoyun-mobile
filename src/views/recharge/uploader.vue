<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="main">
      <h3>上传交易凭据</h3>
      <van-field v-model="bankCardNum" type="digit" clearable label="银行卡号：" placeholder="请输入银行卡号" maxlength="20" />
      <ul class="card-list" v-if="cardShow">
        <li v-for="item in cardList" :key="item.id" @click="selectCard(item.credit_card)">{{ item.credit_card }}</li>
      </ul>
      <van-field v-model="money" type="digit" label="充值金额：" clearable placeholder="请输入充值金额" maxlength="9" @focus="clearCardNum" />
      <van-field v-model="name" label="姓名" placeholder="请输入该卡号绑定的姓名" clearable :border="false" maxlength="10" @focus="clearCardNum" />
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="1"
        :after-read="onRead"
        :before-delete="onDelete"
      >
        <div>
          <van-icon name="back-top" />
          <p>点击上传凭据</p>
        </div>
      </van-uploader>
      <van-button @click="submit">确认提交</van-button>
    </div>
    <p class="remain">说明:上传您的交易凭据后，我们会进行核实，核实时间为一般为1到2个工作日，处理完后会告知您，请及时查看到账情况</p>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import { post } from '@/utils/request'
import { createCheck, getBankCardNumList } from '@/api/check'
Vue.prototype.$post = post
export default {
  name: 'RechargeUploader',
  data: () => ({
    headerTitle: '充值交易',
    paymentIndex: 0,
    surplusMoney: '0.00',
    fileList: [],
    filePath: '',
    isUploadFile: false,
    bankCardNum: '',
    money: '',
    name: '',
    cardList: [],
    cardShow: false
  }),
  watch: {
    bankCardNum(value) {
      this.getBankCardNumList(value)
    }
  },
  methods: {
    getHistoryBill() {
      this.$router.push('/history-bill')
    },
    clearCardNum() {
      this.cardList = []
      this.cardShow = false
    },
    getBankCardNumList(num) {
      if (!num.length) {
        this.clearCardNum()
      } else {
        const params = {
          credit_card: num,
          user_code: localStorage.getItem('userCode')
        }
        getBankCardNumList(params).then(res => {
          const result = res.data.data
          if (result.list && result.list.length) {
            if (num === result.list[0].credit_card) {
              this.clearCardNum()
            } else {
              this.cardList = result.list
              this.cardShow = true
            }
          } else {
            this.clearCardNum()
          }
        })
      }
    },
    selectCard(num) {
      this.bankCardNum = num
      this.clearCardNum()
    },
    onRead(file) {
      this.isUploadFile = true
      const formData = new FormData()
      const url = '/v1/uploading/FileUploading'
      formData.append('file', file.file)
      this.fileList[0].status = 'uploading'
      this.$post(
        url,
        formData,
        { headers: { 'Content-Disposition': 'form-data' }}
      ).then(res => {
        if (res.code === 200) {
          this.filePath = res.data.abspath
          this.fileList[0].status = ''
          Toast('上传成功')
        } else {
          this.fileList[0].status = 'failed'
        }
      }).catch(() => {
        this.fileList[0].status = 'failed'
      }).finally(() => {
        this.isUploadFile = false
      })
    },
    onDelete() {
      this.fileList = []
      this.filePath = ''
    },
    submit() {
      if (!this.filePath.length && !this.isUploadFile) {
        Toast('请上传对应交易凭据')
      } else if (!this.filePath.length && this.isUploadFile) {
        Toast('图片正在上传中，请耐心等待')
      } else if (this.filePath.length && !this.isUploadFile) {
        if (!this.bankCardNum.length) {
          Toast('银行卡号不能为空')
        } else if (this.bankCardNum.length < 16) {
          Toast('银行卡号长度不对')
        } else if (!this.money.length) {
          Toast('充值金额不能为空')
        } else if (Number(this.money) === 0) {
          Toast('充值金额不能为0')
        } else if (!this.name.length) {
          Toast('姓名不能为空')
        } else {
          const params = {
            credit_card: this.bankCardNum,
            screenshot_url: this.filePath,
            user_code: localStorage.getItem('userCode'),
            money: this.money,
            name: this.name,
            type: '1'
          }
          createCheck(params).then(res => {
            Toast('提交成功')
            this.$router.replace({
              name: 'rechargeResult',
              query: {
                type: 'recharge'
              }
            })
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  border-radius: .667rem;
  margin: .833rem;
  padding: 1.4167rem 1.25rem 1.5rem 2.083rem;
  position: relative;
  height: 29rem;
  h3 {
    font-size: 1.167rem;
    font-weight: 600;
    color: #000;
    line-height: 1.667rem;
    text-align: center;
  }
  .card-list {
    position: absolute;
    left: 9rem;
    z-index: 999;
    background: #fff;
    width: calc(100% - 13rem);
    border: 1px solid #ebedf0;
    border-top: none;
    li {
      padding: .2rem;
      height: 1.677rem;
      line-height: 1.677rem;
      font-size: 1.167rem;
      &:hover {
        background: #F5F5F6;
      }
    }
  }
  .van-uploader {
    margin-top: 1rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 18.75rem;
    height: 10rem;
    .van-icon {
      font-size: 1.5rem;
      margin-bottom: .5rem;
    }
    /deep/ .van-uploader__wrapper {
       width: 18.75rem;
       height: 10rem;
    }
    /deep/ .van-uploader__preview-image {
      width: 18.75rem;
      height: 10rem;
    }
    /deep/ .van-uploader__input-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18.75rem;
      height: 10rem;
      background: #FBFBFB;
      p {
        line-height: 1.667rem;
        font-size: 1.167rem;
        font-weight: 400;
        color: #555555;
      }
    }
  }
  p {
    margin-top: 1.667rem;
    font-size: 1.167rem;
    font-weight: 400;
    color: #555;
    line-height: 1.667rem;
  }
  .van-button {
    display: block;
    margin: 13rem auto 0;
    width: 20.8333rem;
    height: 3.333rem;
    line-height: 3.333rem;
    background: #3C51FF;
    border-color: #3C51FF;
    border-radius: 1.6667rem;
    color: #fff;
  }
}
.remain {
  margin: 1.5rem 2.083rem 0;
  font-size: 1.167rem;
  font-weight: 400;
  color: #555;
  line-height: 1.667rem;
  text-align: justify;
}
</style>
