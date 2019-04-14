<template>
  <div class="book-primary">
    <TopSwiper :tops="tops"></TopSwiper>
    <Card :key='book.id' v-for="book in books" :book="book"></Card>
    <div class="text-footer" v-if="!more">
      没有更多的书了~
    </div>
  </div>
</template>

<script>
import {get} from '@/utils'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
  mounted () {
    this.getBooks(true)
    this.getTop()
  },
  onShow () {
    this.getBooks(true)
    this.getTop()
  },
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  methods: {
    async getBooks (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const res = await get('/weapp/booklist', {page: this.page})
      console.log(res)
      console.log(res.data.list)
      // this.books = res.data.list
      if (res.data.list.length < 7 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = res.data.list
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(res.data.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/weapp/top')
      console.log(tops.data.list)
      this.tops = tops.data.list
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getBooks(true)
    console.log(this.more)
  },
  onReachBottom () {
    console.log('上拉')
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.getBooks(false)
  }
}
</script>

<style>
.book-primary{
  height: 100%;
}
</style>
