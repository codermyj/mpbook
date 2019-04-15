<template>
    <div>
      <BookInfo :info="bookInfo"></BookInfo>
      <textarea v-model="comment" class="textarea" placeholder="请输入图书评论" :maxlength="100"></textarea>
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
      bookInfo: {}
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
</style>
