<template>
    <div>
      <BookInfo :info="bookInfo"></BookInfo>
      <CommentList :comments="comments"></CommentList>
      <!--{{showAdd}}-->
      <div class="comment" v-if="showAdd">
        <textarea v-model="comment" class="textarea" placeholder="请输入图书评论" :maxlength="100"></textarea>
      <div class="location">
        地理位置:
        <switch color="2d8cf0" :checked="location" @change="getGeo" />
        <span class="text-primary">
          {{location}}
        </span>
      </div>
      <div class="phone">
        手机型号:
        <switch color="2d8cf0" :checked="phone" @change="getPhone" />
        <span class="text-primary">
          {{phone}}
        </span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
      <div v-else class="text-footer">
        {{theMsg}}
      </div>
      <button open-type="share" class="btn">转发给好友</button>
    </div>
</template>

<script>
import {get, post, showModal} from '@/utils'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'

export default {
  components: {
    BookInfo, CommentList
  },
  computed: {
    showAdd () {
      // 没登录
      if (!this.userinfo.openId) {
        this.theMsg = '您还未登录'
        return false
      }
      // 已经评论过
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        this.theMsg = '您已经评论过了~'
        return false
      }
      return true
    }
  },
  data () {
    return {
      comments: [],
      userinfo: {},
      bookid: '',
      bookInfo: {},
      location: '',
      phone: '',
      comment: '',
      theMsg: ''
    }
  },
  methods: {
    // 评论 手机型号 位置 openid
    async addComment () {
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location

      }
      try {
        await post('/weapp/addcomment', data)
      } catch (e) {
        showModal('评论失败', e.msg)
      }
      this.getComments()
    },
    async getDetail () {
      let bookdetail = await get('/weapp/bookdetail', {id: this.bookid})
      console.log(bookdetail.data.title)
      wx.setNavigationBarTitle({
        title: bookdetail.data.title
      })
      this.bookInfo = bookdetail.data
      this.bookInfo.detail = bookdetail.data.title.repeat(20)
    },
    getGeo (e) {
      const ak = ''
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            console.log(geo)
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.formatted_address
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        console.log(phoneInfo)
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
      // console.log(e)
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = comments.data.list || []
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.userinfo = userinfo
      console.log(userinfo)
    }
  }
}
</script>

<style lang="scss">
  .comment{
    margin-top:10px;
  .textarea{
    width:730rpx;
    height:200rpx;
    background:#eee;
    padding:10rpx;
  }
  .location{
    margin-top:10px;
    padding:5px 10px;
  }
  .phone{
    margin-top:10px;
    padding:5px 10px;

  }
  }

</style>
