<template>
  <div>
    <transition :name="transitionName">
      <router-view class="switch-router" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  data: () => ({
    transitionName: 'slide-left',
    isiOS: false
  }),
  watch: {
    $route() {
      const isBack = this.$router.isBack
      const isIosMoveBack = sessionStorage.getItem('isIosMoveBack')
      if (Number(isIosMoveBack)) {
        this.transitionName = ''
        sessionStorage.setItem('isIosMoveBack', 0)
      } else {
        if (isBack) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      }
      this.$router.isBack = false
    }
  },
  mounted() {
    this.isIosMove()
  },
  methods: {
    isIosMove() {
      const u = navigator.userAgent
      this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (this.isiOS) {
        document.body.addEventListener('touchmove', () => {
          sessionStorage.setItem('isIosMoveBack', 1)
        }, false)
      }
    }
  }
}
</script>
<style lang="scss">
.slide-left-enter,.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.switch-router {
  position: absolute;
  height: 100%;
  transition: all .5s ease;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 1000;
}
.slide-left-leave-active,.slide-right-enter {
  opacity: 0;
  transform: translate3d(100%, 0 ,0);
}
</style>
