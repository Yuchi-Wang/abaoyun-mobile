<template>
  <div class="app-wrapper">
    <router-view />
    <van-tabbar ref="vantTabbar" route active-color="#000" inactive-color="#858585">
      <van-tabbar-item
        v-for="item in tabbarList"
        :key="item.id"
        replace
        :to="item.url"
      >
        {{ item.title }}
        <template #icon="props">
          <img :src="props.active ? item.activeImg : item.img" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data: () => ({
    tabbarList: [
      {
        id: 1,
        url: '/',
        title: '首页',
        activeImg: require('@/assets/img/home/home_active.svg'),
        img: require('@/assets/img/home/home.svg')
      },
      {
        id: 2,
        url: '/product-list',
        title: '产品',
        activeImg: require('@/assets/img/home/product_active.svg'),
        img: require('@/assets/img/home/product.svg')
      },
      {
        id: 3,
        url: '/service',
        title: '文档',
        activeImg: require('@/assets/img/home/doc_active.svg'),
        img: require('@/assets/img/home/doc.svg')
      },
      {
        id: 4,
        url: '/my',
        title: '我的',
        activeImg: require('@/assets/img/home/my_active.svg'),
        img: require('@/assets/img/home/my.svg')
      }
    ]
  })
}
</script>
<style scoped lang="scss">
.van-tabbar {
  padding-top: .3rem;
  padding-bottom: calc(10px + constant(safe-area-inset-bottom));
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  box-shadow: 0 .5rem 1rem 0 #b8b8b8;
}
.van-tabbar-item__icon img {
  width: 2rem;
  height: auto;
  margin-bottom: .2rem;
}
</style>
