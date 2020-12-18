import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs: [{
      id: 0,
      isActive: true,
      value: "全部订单"
    },
    {
      id: 1,
      isActive: false,
      value: "待付款"
    },
    {
      id: 2,
      isActive: false,
      value: "待发货"
    },
      {
        id: 3,
        isActive: false,
        value: "退货/退款"
      },
    ]
  },

  handleItemchange(e) {
    const { index } = e.detail;
    this.getTabChange(index);
    this.gatOrder(index+1)
  },
  getTabChange(index){
    const { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    let token  = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }

    let currentPages =getCurrentPages();
    let { type }= currentPages[currentPages.length-1];
    this.getTabChange(type.type-1)
    this.gatOrder(type);
    
  },
  async gatOrder(type){
    let {orders}=await request({
          url: '/my/orders/all',
          data: {type}  
        });
   
        this.setData({
          orders: orders.map(v =>( {
            ...v,create_time_cn :(new Date(v.create_time * 1000).toLocaleString())
          }))
        })
    }
})