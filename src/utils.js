import qcloud from 'wafer2-client-sdk'
import config from './config'
import Fly from 'flyio/dist/npm/wx'

var fly = new Fly()

export function get (url, data) {
  return fly.get(`${config.host}${url}`, data).then(res => {
    return res.data
  })
}
export function post (url, data) {
  return fly.post(`${config.host}${url}`, data).then(res => {
    return res.data
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function weLogin () {
  return new Promise((resolve, reject) => {
    qcloud.setLoginUrl(config.loginUrl)
    qcloud.login({
      success (userInfo) {
        wx.setStorageSync('userInfo', userInfo)
        resolve(userInfo)
      },
      fail (err) {
        console.log('登录失败', err)
        reject(err)
      }
    })
  })
}
