<template>
  <div>
    <div>图书列表页面</div>
    <i-modal title="用户登录" v-bind:visible="visible1" bind:ok="handleClose1" bind:cancel="handleClose1">
      <view>是否允许获取微信用户信息</view>
    </i-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible1: true
    }
  }
}
</script>

<style>

</style>
