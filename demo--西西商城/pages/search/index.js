// pages/search/index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      goods:[],
     isFocus:false,
     inputData:""
  },
  Times:-1,
  handleSeacrch(e){
    let { value } = e.detail;
    if (!value.trim()){ //判断是否为空值
      this.setData({
        isFocus: false,
        goods:[]
      })
        return;
    }
    this.setData({
      isFocus: true
    })
    clearTimeout(this.Times)
    this.Times = setTimeout(()=>{
      this.getSearch(value)
    },1000)
    
  },
  async getSearch(value){
  let res = await request({ 
      url: "/goods/qsearch", 
      data: { query: value}
    })
    this.setData({
     goods: res,
    })
  },
  handleCancel(e){
    this.setData({
      goods: [],
      isFocus: false,
      inputData:""
    })
  }
 
 
})