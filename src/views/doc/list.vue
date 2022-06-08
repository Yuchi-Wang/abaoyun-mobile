<template>
  <div class="doc-main">
   <header>
      <h3>技术文档</h3>
   </header>
    <van-cell-group>
      <van-cell title="阿宝技术文档" :border="false" is-link @click="handleViewAbao" />
      <van-cell title="金融NLP技术文档" :border="false" is-link @click="handleViewNlp" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'Doc',
  data: () => ({
    docUrl: ''
  }),
  methods: {
    handleViewAbao() {
      const env = process.env.NODE_ENV
      if (env === 'development' || env === 'test') {
        this.docUrl = 'http://210.5.7.219:8004/docs/#/'
      } else {
        this.docUrl = 'http://120.55.164.177/docs/#/'
      }
      window.open(this.docUrl)
    },
    handleViewNlp() {
      this.$router.push('/nlp-doc')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 3.667rem;
  line-height: 3.667rem;
  text-align: center;
  background: #fff;
  h3 {
    font-size: 1.417rem;
    font-weight: 600;
    color: #000000;
  }
}
.van-cell-group {
  margin: 1.25rem 1rem;
  border-radius: .667rem;
  .van-cell {
    border-radius: .667rem;
  }
}
</style>

