<template>
  <div class="base-header">
    <i class="turn-back-icon" @click="turnBack" />
    <h3>{{ headerTitle }}</h3>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    headerTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    turnBack() {
      if (this.$fromUrl.name === null) {
        this.$router.replace('/')
      } else {
        this.$router.back()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.base-header {
  position: relative;
  height: 3.667rem;
  line-height: 3.667rem;
  text-align: center;
  background: #fff;
  h3 {
    font-size: 1.417rem;
    font-weight: 600;
    color: #000000;
  }
  .select-language {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    p {
      font-size: 1.167rem;
      font-weight: 400;
    }
    .triangle-down {
      width: 0;
      height: 0;
      display: inline-block;
      vertical-align: middle;
      border-left: 0.417rem solid transparent;
      border-right: 0.417rem solid transparent;
      border-top: 0.417rem solid #000;
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
</style>
