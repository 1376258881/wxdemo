import { login } from "../../utils/asyncWX.js";
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {   //支付功能需要企业账号和和后台
    token: {  //只能模拟数据       
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async handleGetuserinfo(e){
    //获取参数
    const { encryptedData, rawData, iv, signature } = e.detail;
    const {code} =await login();
    const loginParmas = { encryptedData, rawData, iv, signature, code}
    // var token = await request({
    //     url: '/users/wxlogin',
    //     data: loginParmas,
    //     method:'post'
    // })

    //赋值模拟数据
    let { token }=this.data
    wx.setStorageSync("token", token);
    //返回上一层
    wx.navigateBack({
      delta:1 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})