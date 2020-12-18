// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWX.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPnum: 0,
    totalPprice: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let address = wx.getStorageSync('address');  //地址
    let cart = wx.getStorageSync('cart') || [];   //缓存中的商品信息
    cart = cart.filter(v => v.chek);
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    this.setData({ address })
    this.setCart(cart)
  },
  setCart(cart) {
    let totalPprice = 0;  //总金额
    let totalPnum = 0;   //总数量
    cart.forEach(v => {    
        totalPprice += v.goods_price * v.num;
        totalPnum += v.num
    })
    this.setData({
      cart,
      totalPprice,
      totalPnum
    })
   // wx.setStorageSync('cart', cart);
  },
  async handleOrderPay(){
    try{
      let { token } = wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
        return;
      }
     // const header = { Authorization: token };  //请求头
      const { address, cart, totalPprice } = this.data;
      let goods = []
      cart.forEach(v => {
        goods.push({ goods_id: v.goods_id, goods_number: v.num, goods_price: v.goods_price })
      })
      let res = await request({ 
        url: "/my/orders/create",
        method: "POST",
      //  header,
        data: {
          order_price: totalPprice,
          consignee_addr: address.all,
          goods: goods
        }
      });
      const { order_number } = res; //获取创建订单的编号
      //  发起预支付接口
      const { pay } = await request({
        url: "/my/orders/req_unifiedorder",
        method: "POST",
       // header,
        data: {
          order_number
        }
      });
      await requestPayment(pay);  //发起支付 
      const res2 = await request({  //查看支付状态
        url: "/my/orders/chkOrder",
        method: "POST",
       // header,
        data: {
          order_number
        }
      })
      await showToast({title:"支付成功"})
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch(err){
      await showToast({ title: "支付失败" })
      console.log(err)
    }
  }
})