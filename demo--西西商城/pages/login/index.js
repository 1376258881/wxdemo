// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleGetUserInfo(e){
    console.log(e.detail)
    const { userInfo } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1,
    })
  }
})