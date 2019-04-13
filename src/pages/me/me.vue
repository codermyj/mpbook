<template>
  <div>
    <div class="container">
      <!-- <p>{{ userinfo.openId }}</p> -->
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
import {weLogin, post, showModal} from '@/utils'
import YearProgress from '@/components/YearProgress'
export default {

  created () {
    this.isLogin = !!wx.getStorageSync('userInfo')
    if (this.isLogin) {
      this.userinfo = wx.getStorageSync('userInfo')
    }
  },
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '/static/img/unlogin.png',
        nickName: '未登录'
      },
      isLogin: false
    }
  },
  methods: {
    // 登录函数
    async doLogin () {
      if (!this.isLogin) {
        this.userinfo = await weLogin()
        this.isLogin = !!wx.getStorageSync('userInfo')
      }
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
          this.addBook(res.result)
        }
      })
    },
    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      if (res.code === 0) {
        showModal('添加成功', `《${res.data.title}》添加成功`)
      } else {
        showModal('添加失败', res.data.msg)
      }
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

