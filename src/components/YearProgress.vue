<template>
  <div class="progressbar">
    <progress percent="20" activeColor="#2d8cf0"></progress>
    <p>{{ year }}过去了{{ days }}天,已经过去了{{percent}}%</p>
  </div>

</template>

<script>
export default {
  methods: {
    // 判断是否为闰年
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear ? 366 : 365
    }

  },
  computed: {
    // 获取年份并展示
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      let offset = (new Date().getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      return parseInt(offset) + 1
    },
    percent () {
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
    }
  }

}
</script>

<style lang='scss'>
.progressbar{
  text-align: center;
  margin-top: 5px;
  margin-bottom: 40px;
  width: 100%;
  progress{
    margin-bottom: 10px;
  }
}
</style>

