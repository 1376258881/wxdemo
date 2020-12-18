// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[],
    tabs: [{
      id: 0,
      isActive: true,
      value: "商品收藏"
    },
    {
      id: 1,
      isActive: false,
      value: "品牌收藏"
    },
    {
      id: 2,
      isActive: false,
      value: "店铺收藏"
    },
      {
        id: 3,
        isActive: false,
        value: "浏览足迹  "
      },
    ]
  },
  handleItemchange(e) {
    const { index } = e.detail;
    const { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  onShow: function () {
    const collect = wx.getStorageSync('collect');
    this.setData({
      collect
    })
  },

})