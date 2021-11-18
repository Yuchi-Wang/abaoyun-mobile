<template>
  <div>
    <baseHeader :header-title="headerTitle" />
    <div class="appiy-main">
      <div class="treaty">
        <h4>{{ contractDetail.contract_name }}</h4>
        <p v-html="contractDetail.content" />
      </div>
      <div class="upload" @click="turnBuck">返回</div>
    </div>
  </div>
</template>

<script>
import { getTemplateList } from '@/api/contract'
export default {
  name: 'ApplyContract',
  data: () => ({
    headerTitle: '使用协议',
    contractDetail: {}
  }),
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      const params = {
        pageIndex: 1,
        pageSize: 10,
        product_id: this.$route.query.id
      }
      getTemplateList(params).then(res => {
        this.contractDetail = res.data.data.list[0]
      })
    },
    turnBuck() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.appiy-main {
  position: relative;
  height:  calc(100% - 8rem);
  margin: .833rem .833rem 0 .833rem;
  background: #fff;
  border-radius: .667rem;
  padding: 1.4167rem 1rem 0 2rem;
  box-sizing: border-box;
  h4 {
    height: 1.667rem;
    line-height: 1.667rem;
    margin-bottom: .5rem;
    text-align: center;
    font-size: 1.167rem;
    font-weight: bolder;
    color: #000;
  }
  .product-name {
    position: absolute;
    top: 1.4167rem;
    right: 2rem;
    height: 1.4167rem;
    line-height: 1.4167rem;
  }
  .treaty {
    height:  calc(100% - 6rem);
    overflow: auto;
    padding-right: 1rem;
    p {
      line-height: 1.4167rem;
      text-align: justify;
    }
  }
  .upload {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 4.4167rem;
    line-height: 4.4167rem;
    font-size: 1.167rem;
    font-weight: 600;
    color: #3C51FF;
  }
}
</style>
