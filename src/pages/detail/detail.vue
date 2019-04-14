<template>
    <div>
        图书详情
        人家还没准备好啦~
    </div>
</template>

<script>
import {get} from '@/utils'
export default {
  data () {
    return {
      bookid: ''
    }
  },
  methods: {
    async getDetail () {
      await get('/weapp/bookdetail', {id: this.bookid})
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>

<style>

</style>
