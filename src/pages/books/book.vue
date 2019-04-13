<template>
  <div>
    <Card :key='book.id' v-for="book in books" :book="book"></Card>
  </div>
</template>

<script>
import {get} from '@/utils'
import Card from '@/components/Card'
export default {
  mounted () {
    this.getBooks()
  },
  onShow () {
    this.getBooks()
  },
  components: {
    Card
  },
  data () {
    return {
      books: []
    }
  },
  methods: {
    async getBooks () {
      const res = await get('/weapp/booklist')
      console.log(res)
      this.books = res.data.books
    }
  }
}
</script>

<style>

</style>
