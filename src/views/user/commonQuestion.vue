<template>
  <div class="doc-main">
    <baseHeader :header-title="headerTitle" />
    <van-cell-group>
      <van-cell
        v-for="item in questionList"
        :key="item.id"
        :title="item.name"
        :border="false"
        is-link
        @click="getQuestionDetail(item.id)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getList } from '@/api/question'
export default {
  name: 'CommonQuestion',
  data: () => ({
    headerTitle: '常见问题',
    questionList: []
  }),
  mounted() {
    this.getList()
  },
  methods: {
    getQuestionDetail(id) {
      this.$router.push({
        name: 'questionDetail',
        query: {
          id: id
        }
      })
    },
    getList() {
      const params = {
        pageIndex: 1,
        pageSize: 10
      }
      getList(params).then(res => {
        this.questionList = res.data.data.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group {
  margin: 1.25rem 1rem;
  border-radius: .667rem;
  .van-cell {
    border-radius: .667rem;
  }
}
</style>

