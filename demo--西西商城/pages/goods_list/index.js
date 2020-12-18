import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goods_list: [],
      goods_list2:[],
      tabs:[{
        id:0,
        isActive:true,
        value:"综合"
      },
        {
          id: 1,
          isActive: false,
          value: "销量"
        },
        {
          id: 2,
          isActive: false,
          value: "价格"
        },
      ]
  },
  Queryparams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  _goods_list:[],
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Queryparams.cid =  options.cid || '';
    this.Queryparams.query = options.query || '';
    this.getGoodsList();
  },
  async getGoodsList(){
    const res = await request({ url: "/goods/search", data: this.Queryparams});
   //计算总页数
    const { total } = res;
    this.totalPages = Math.ceil(total / this.Queryparams.pagesize); 
    console.log(this.totalPages)
    this.setData({
      goods_list: [...this.data.goods_list,...res.goods],
      goods_list2: [...this.data.goods_list, ...res.goods],
    })
    wx.stopPullDownRefresh(); //关闭下拉窗口
  },
   handleItemchange(e){
    let _this=this;
    const { index }=e.detail;
     const { tabs, goods_list2} = this.data;
     let goods_list = this.data.goods_list
      tabs.forEach((v, i) => {
        i === index ? v.isActive = true : v.isActive=false;
      })
     goods_list.sort((a, b) => {
       if (index === 1) {
         return b.goods_price - a.goods_price;
       } else if (index === 2) {
         console.log(index)
         return a.goods_price - b.goods_price;
       }
       if (index === 0) {
         goods_list = goods_list2
       }
     })
     this.setData({
      tabs,
       goods_list
    })
  },
  onReachBottom(){
    if (this.Queryparams.pagenum>=this.totalPages){
        wx.showToast({
          title: '没有下一页数据',
        })
    }else{
      this.Queryparams.pagenum++;
      this.getGoodsList();
    }

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      // 下拉重置
    this.Queryparams.pagenum = 1;
    this.setData({
      goods_list:[]
    });
    this.getGoodsList();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})