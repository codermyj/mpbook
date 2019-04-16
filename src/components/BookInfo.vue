<template>
    <div class="bookinfo">
      <div class="thumb">
        <img class="back"
          :src="info.image"
          mode="aspectFill"/>
        <img class="image"
             :src="info.image"
              mode="aspectFit"/>
        <div class="info">
          <div class="title">
            {{info.title}}
          </div>
          <div class="author">
            {{info.author}}
          </div>
        </div>
      </div>
      <div class="detail">
        <p>{{info.detail}}</p>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['info']
  }
</script>

<style lang="scss" scoped>
  .bookinfo{
    .thumb{
      width: 750rpx;
      height: 500rpx;
      overflow: hidden;
      position: relative;
      .back{
        filter: blur(15px);
        width: 100%;
      }
      .image{
        position: absolute;
        top: 30rpx;
        width: 100%;
        height: 300rpx;
        left: 0;
      }
      .info{
        color: white;
        position: absolute;
        left: 0;
        top: 330rpx;
        width: 100%;
        text-align: center;
        .title{
          font-size: 20px;
        }
        .author{
          font-size: 14px;
        }
      }
    }
  }
</style>
