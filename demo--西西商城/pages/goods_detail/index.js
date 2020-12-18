import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  Goodinfos:[],  //商品详情
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    
    const currentPages=getCurrentPages();
    var opions = currentPages[currentPages.length - 1].options
    const {goods_id} = opions;
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id){
    const goodsObj = await request({
      url: "/goods/detail", data: { goods_id }
    });
    this.Goodinfos = goodsObj;
    const collect = wx.getStorageSync("collect") || [];
    let isCollect = collect.some(v => v.goods_id === this.Goodinfos.goods_id); //收藏按钮
    this.setData({
      goodsObj:{
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, ".jpg"), //防止苹果手机不识别webp格式
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        pics:goodsObj.pics
      },
      isCollect
    })
  },
  handlePrevewImage(e){
    console.log(e.currentTarget.dataset)
    const current = e.currentTarget.dataset.url;
    const urls = this.Goodinfos.pics.map(v => v.pics_mid);
    wx.previewImage({
      urls,
      current
    })
  },
  handleCartadd(){ //购物车
    let cart = wx.getStorageSync('cart') || []; 
    let index = cart.findIndex(v => v.goods_id === this.Goodinfos.goods_id);
    console.log(index)
    if (index===-1){    
      this.Goodinfos.num=1;
      this.Goodinfos.chek=true;
      cart.push(this.Goodinfos);   
    }else{
      cart[index].num++;   
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })

  },

  //收藏
  handleCollect(){
    let {isCollect}=this.data;
    const collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.Goodinfos.goods_id);
    if (index === -1) {   
      collect.push(this.Goodinfos);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        mask:true,
        icon: "success"
      })
     }else{
      collect.splice(index,1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        mask: true,
        icon:"success"
      })
     }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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