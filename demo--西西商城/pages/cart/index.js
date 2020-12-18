// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showModal,showToast } from "../../utils/asyncWX.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    chekAll:false,
    totalPnum:0,
    totalPprice:0
  },
  async handleChooseAddress(){  

    try { 
      let res = await getSetting();
      if (res.authSetting["scope.address"] == false) {
        await openSetting();
      }
      let res2 = await chooseAddress();
      wx.setStorageSync('address', res2)
    }catch(err){
        console.log(err)
    }
    
    // wx.getSetting({
    //   success(res){
    //     console.log(res.authSetting["scope.address"]);
    //     if (res.authSetting["scope.address"] == true || res.authSetting["scope.address"] == undefined){
    //         wx.chooseAddress({
    //           success:(res)=>{              
    //           }
    //         });
    //     }else{
    //       wx.openSetting({
    //         success(res1) { 
    //           wx.chooseAddress({
    //             success: (res) => {
    //             }
    //           });
    //         }
    //       })
    //     }
    //   }
    // })    
  },
  /**
   * 生命周期函数--监听页面显示
   */ 
  onShow: function () {
    let address = wx.getStorageSync('address');  //地址
    const cart = wx.getStorageSync('cart')|| [];   //缓存中的商品信息
    // let chekAll = cart.lenght == 0 ? false : cart.every(v => v.chek); //全选
    this.setData({address})
    this.setCart(cart)
  },
  handlecheChange(e){
    console.log(e.currentTarget.dataset.goods_id);
    const cart = wx.getStorageSync('cart') || [];   //缓存中的商品信息
    let index = cart.findIndex(v => v.goods_id === e.currentTarget.dataset.goods_id)
    cart[index].chek = !cart[index].chek;
    //重新计算
    this.setCart(cart)
  },
  setCart(cart){
    let chekAll = true;
    let totalPprice = 0;  //总金额
    let totalPnum = 0;   //总数量
    cart.forEach(v => {
      if (v.chek) {   //哪个商品选中，就计算哪个
        totalPprice += v.goods_price * v.num;
        totalPnum += v.num
      } else {      //只要有一个没有选中，全选就为false
        chekAll = false;
      }
    })
    chekAll = cart.lenght == 0 ? false : chekAll;
    this.setData({
      cart,
      chekAll,
      totalPprice,
      totalPnum
    }) 
    wx.setStorageSync('cart', cart);     
  },
  handleChekAll(){
    let { chekAll, cart}=this.data;
    chekAll=!chekAll;
    cart.forEach(v=>{
      v.chek = chekAll
    });
    this.setCart(cart)
  },
  async handleEditChange(e){
    //console(e.currentTarget.dataset);
    let { goods_id, add } = e.currentTarget.dataset;
    let { cart } = this.data;
    let index=cart.findIndex(v => v.goods_id == goods_id);
    if (cart[index].num === 1 && add===-1 ){
      let res = await showModal({ content: "您是否要删除该商品" });
      if (res.confirm) {
        cart.splice(index,1);
        this.setCart(cart)
      }
    }
      cart[index].num += add
      this.setCart(cart)    
  },
 async handlePay(){
   const { address, totalPnum}=this.data;
   if (!address.userName){
     await showToast({ title:"您还没有收货地址"})
      return;
   }
   if (totalPnum===0){
     await showToast({ title: "购物车为空，请添加商品" })
    return;
   }
   wx.navigateTo({
     url: '/pages/pay/pay',
   })
  }
})