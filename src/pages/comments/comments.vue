<template>
  <div class="container">
    <CommentList :comments="comments"></CommentList>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import {get} from '@/utils'
export default {
  data () {
    return {
      comments: [],
      userinfo: {}
    }
  },
  components: {
    CommentList
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      wx.hideNavigationBarLoading()
    },
    async getComments () {
      const res = await get('/weapp/commentlist', {openid: this.userinfo.openId})
      this.comments = res.data.list
    }
  },
  onShow () {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userInfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  }
}
</script>

<style>

</style>
