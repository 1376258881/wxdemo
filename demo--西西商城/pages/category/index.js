// pages/category/index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({
  data: {
    leftMenList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  }, 
  Cates: [],
  onLoad: function (options) {
    const Cate = wx.getStorageSync('cates'); 
    if (!Cate){
      this.getCates();
    }else{
      if (Date.now() - Cate.time>1000*10){  //设置请求过期时限
        this.getCates(); 
       // console.log(Cate.data)
      }else{
        this.Cates = Cate.data;
        console.log(Cate.data)
        let leftMenList = this.Cates.map((v) => v.cat_name);
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenList,
          rightContent
        })
      }
    }  
  },
  async getCates() {//
    // request({ url: "/categories" })
    // .then((res) => {
    //   this.Cates = res.data.message;
    //   wx.setStorageSync('cates', { time: Date.now(), data: this.Cates});
    //   let leftMenList = this.Cates.map((v) => v.cat_name);
    //   let rightContent = this.Cates[0].children
    //   this.setData({
    //     leftMenList,
    //     rightContent
    //   })
    // });
    const res = await request({ url:'/categories'})
      this.Cates = res;
      wx.setStorageSync('cates', { time: Date.now(), data: this.Cates});
      let leftMenList = this.Cates.map((v) => v.cat_name);
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenList,
        rightContent,   
      })
  },
  handleItemTap(e){
    console.log(e.currentTarget.dataset.index)
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})