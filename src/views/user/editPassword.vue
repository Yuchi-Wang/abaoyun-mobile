<template>
  <div>
    <baseHeader :header-title="headerTitle" />
     <van-cell-group>
      <van-field v-model="originPassword" type="password" label="请输入原密码" maxlength="16" placeholder="请输入当前登录密码" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="newPassword" type="password" label="确认新密码" maxlength="16" placeholder="确认新密码" />
    </van-cell-group>
    <van-button round type="info" @click="save">保存</van-button>
  </div>
</template>

<script>
export default {
  name: 'EditPassword',
  data: () => ({
    headerTitle: '修改密码',
    originPassword: '',
    newPassword: ''
  }),
  methods: {
    save() {}
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group {
  margin: .833rem;
   border-radius: .667rem;
  .van-cell {
    border-radius: .667rem;
  }
}
.van-button {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 8.25rem;
  width: 20.833rem;
  background: #0078F8;
  box-shadow: 0 1.5rem 1rem 0 #E1F0FF;
}
</style>
