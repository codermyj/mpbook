<template>
  <div>
    <div class="container">
      <div class="userinfo">
        <img :src="userinfo.avatarUrl" alt="" />
        <p>{{userinfo.nickName}}</p>
        <p>{{isLogin}}</p>
      </div>
      <YearProgress></YearProgress>
      <button class="btn" @click="scanBook" v-if="isLogin">添加图书</button>
      <button class='btn' open-type="getUserInfo" lang="zh_CN"  @getuserinfo="doLogin" v-if="!isLogin">微信登录</button>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import {weLogin} from '@/utils'
import YearProgress from '@/components/YearProgress'
export default {
  created () {
    // this.isLogin = wx.getStorageSync('userInfo')
  },
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '未登录'
      },
      isLogin: false
    }
  },
  methods: {
    // 登录函数
    async doLogin () {
      if (!this.isLogin) {
        this.userinfo = await weLogin(config.loginUrl)
        this.isLogin = !!wx.getStorageSync('userInfo')
      }
      console.log(this.userinfo)
    },
    scanBook () {
      wx.scanCode({
        success (res) {
          console.log(res)
        }
      })
    }
  },
  watch: {
    isLogin () {
      return wx.getStorageSync('userInfo')
    }
  }
}
</script>

<style lang='scss'>
.container{
  padding: 0 30rpx;
}
.userinfo{
    margin-top: 100rpx;
    text-align: center;
    img{
      width: 128rpx;
      height: 128rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
}
</style>

