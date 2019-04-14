import Vue from 'vue'
import Me from './book'

const app = new Vue(Me)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: true,
    onReachBottomDistance: 50
  }
}
