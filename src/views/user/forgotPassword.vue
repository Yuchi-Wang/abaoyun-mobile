<template>
  <div class="main">
    <div class="logo" />
    <h3 class="title">阿宝云</h3>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data: () => ({
    mobile: '',
    email: '',
    vcCode: '',
    password: ''
  })
}
</script>

<style lang="scss" scoped>
.main {
  padding: 6rem 4.6rem 0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  .logo {
    width: 12rem;
    height: 12rem;
    background: url('../../assets/img/user/my/logo.svg');
    background-repeat: no-repeat;
    background-size: contain;
    margin: auto;
  }
  h3 {
    height: 2.083rem;
    line-height: 2.083rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #000;
    text-align: center;
    margin-top: .667rem;
  }
  .van-button {
    width: 100%;
    margin-top: 4.833rem;
    background: #0078F8;
    box-shadow: 0 1.5rem 1rem 0 #E1F0FF;
  }
}
</style>