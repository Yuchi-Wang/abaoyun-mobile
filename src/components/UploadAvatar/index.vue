<template>
  <div>
    <van-uploader
      class="mt-3"
      :max-size="3 * 1024 * 1024"
      :before-read="beforeRead"
      style="width:100%"
      @oversize="onOversize"
    >
      <van-cell :border="false" is-link>
        <template #title>
          <span class="custom-title">头像</span>
        </template>
        <template #right-icon>
          <van-image
            round
            width="3rem"
            height="3rem"
            :src="avatarUrl"
            class="avatar"
          />
        </template>
      </van-cell>
    </van-uploader>
    <!-- 剪裁图片组件 -->
    <van-popup
      v-model="showCropper"
      class="bg-tran"
      closeable
      position="top"
      :style="{ height: '100%' }"
    >
      <div class="flex-column-center height100">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="option.info"
          :full="option.full"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
          :high="option.high"
          :mode="option.mode"
        />
        <div class="popup_bottom">
          <van-button class="bottom_item" @click="cancelCropper">取消</van-button>
          <van-button class="bottom_item" @click="rotateImage">
            <van-icon name="replay" />
          </van-button>
          <van-button :loading="loading" class="bottom_item" @click="getCropBlob">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Vue from 'vue'
import { post } from '@/utils/request'
Vue.prototype.$post = post
import { VueCropper } from 'vue-cropper'
import { editUserInfo } from '@/api/user'
export default {
  components: { VueCropper },
  props: {
    avatarUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showCropper: false, // 截图弹窗遮罩默认隐藏
      imageAccept: '/jpg,/png,/jpeg',
      imageFileName: '',
      loading: false,
      option: {
        img: '',
        outputSize: 1,
        info: false, // 裁剪框的大小信息
        outputType: 'jpeg', // 裁剪生成图片的格式high
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        canMove: true,
        autoCropWidth: window.innerWidth - 100 + 'px', // 默认生成截图框宽度
        autoCropHeight: window.innerWidth - 100 + 'px', // 默认生成截图框高度
        high: true, // 是否按照设备的dpr 输出等比例图片
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: '100% auto' // 图片默认渲染方式
      }
    }
  },
  methods: {
    // 上传文件过大
    onOversize() {
      this.$toast('图片不能大于3M')
    },
    // 获取文件后缀
    getFileSuffix(fileName) {
      return fileName.match(/\/\w+$/)[0].toLowerCase()
    },
    beforeRead(file) {
      if (!this.imageAccept.includes(this.getFileSuffix(file.type))) {
        return this.$toast('请上传 jpg/png 格式图片')
      }
      this.showCropper = true
      this.imageFileName = file.name
      this.imageToBase64(file)
    },
    // 将本地图片转化为Base64，否则vue-cropper组件显示不出要本地需要剪裁的图片
    imageToBase64(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // 截图框中的图片
        this.option.img = reader.result
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
      }
    },
    // 确认剪裁并上传图片
    async getCropBlob() {
      this.loading = true
      this.$toast('上传中', 0)
      this.$refs.cropper.getCropBlob((data) => {
        const formData = new FormData()
        const url = '/v1/uploading/FileUploading'
        formData.append('file', data, this.imageFileName)
        // formData私有类对象，访问不到，可以通过get判断值是否传进去
        // console.log(formData,formData.get('file'))
        // 上传图片至服务器
        this.$post(
          url,
          formData,
          { headers: { 'Content-Disposition': 'form-data' }}
        ).then(res => {
          const params = {
            user_code: localStorage.getItem('userCode'),
            head_photo: res.data.abspath
          }
          editUserInfo(params).then(response => {
            if (response.data.code === 200) {
              this.$toast('头像上传成功')
              this.$emit('refresh')
            } else {
              this.loading = false
            }
          }).finally(() => {
            this.loading = false
            this.showCropper = false
          })
        })
      })
    },
    // 旋转图片
    rotateImage() {
      this.$refs.cropper.rotateRight()
    },
    // 取消截图上传头像
    cancelCropper() {
      this.showCropper = false
      this.showPopup = true
    }
  }
}
</script>

<style lang="scss" scoped>
.height100 {
  height: calc(100%);
}
.flex-column-center{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.vue-cropper {
  background: #000;
  .cropper-view-box {
	outline: 1px solid #fff !important;
	outline-color: #fff !important;
  }
}
.van-uploader {
  /deep/ .van-uploader__input-wrapper {
	width: 100%;
  }
}
.popup_bottom {
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  padding-top: .3rem;
  background: #000;
  box-shadow: 0 .5rem 1rem 0 #b8b8b8;
  .bottom_item {
    flex:1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    border-radius: 0;
    background: #131313;
    color: #fff;
  }
}
</style>
