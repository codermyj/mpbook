<template>
    <div>
      <BookInfo :info="bookInfo"></BookInfo>
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
    </div>
</template>

<script>
import {get} from '@/utils'
import BookInfo from '@/components/BookInfo'

export default {
  components: {
    BookInfo
  },
  data () {
    return {
      bookid: '',
      bookInfo: {},
      location: '',
      phone: ''
    }
  },
  methods: {
    async getDetail () {
      let bookdetail = await get('/weapp/bookdetail', {id: this.bookid})
      console.log(bookdetail.data.title)
      wx.setNavigationBarTitle({
        title: bookdetail.data.title
      })
      this.bookInfo = bookdetail.data
      this.bookInfo.detail = bookdetail.data.title.repeat(50)
    },
    getGeo (e) {
      const ak = '9ugdZD44BniceIzbPpiGlorKVK1qa24L'
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
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>

<style>
.textarea{
  height: 200rpx;
  width: 730rpx;
  background: #eee;
  padding: 10rpx;
  margin-top: 450rpx;
}
  .location{
    margin-top: 10px;
  }
  .phone{
    margin-top: 10px;
  }
</style>
