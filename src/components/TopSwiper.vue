<template>
  <div>
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="500"
      class="swiper">
      <div :key="imgIndex" v-for="(urls, imgIndex) in imgUrls">
        <swiper-item >
          <img @click="bookDetail(img)" class="slide-image" mode="aspectFit" :key="img.id" v-for="img in urls" :src="img.image"/>
        </swiper-item>
      </div> 
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      let res = this.tops
      return [res.slice(0, 4), res.slice(4, 8), res.slice(8, 12)]
    }
  },
  methods: {
    bookDetail (img) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${img.id}`
      })
    }
  }
}
</script>

<style lang="scss">
.swiper{
margin-top: 5px;
.slide-image{
    width: 25%;
    height: 250rpx;
}
}
</style>
