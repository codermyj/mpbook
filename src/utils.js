import qcloud from 'wafer2-client-sdk'

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function weLogin (url) {
  return new Promise((resolve, reject) => {
    qcloud.setLoginUrl(url)
    qcloud.login({
      success (userInfo) {
        // console.log('登录成功', userInfo)
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
