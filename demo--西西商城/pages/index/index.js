import { request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime.js';
//获取应用实例 
Page({

  /**
   * 页面的初始数据 
   */
  data: { 
    swiperList:[],
    cateList:[],
    foorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
      // var reqTask = wx.request({  //发送异步请求
      //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      //   success:(result) =>{
      //     console.log(result)
      //     this.setData({
      //       swiperList: result.data.message
      //     })
      //   }
      // })
     this.getSwiperList();
     this.getCateList();
     this.getFoorList();
  },
  getSwiperList() {  //获取 轮播图
    request({ url: '/home/swiperdata' }).then((result) => {
      result.map(v => {
        v.navigator_url = v.navigator_url.replace(/\/main/g, '/index');
      })
      this.setData({
        swiperList: result
      })
    }, (err) => {
      console.log(err)
    })
  },
  getCateList() { //获取分类导航
    request({ url: '/home/catitems' }).then((result) => {
      result.map(v => {
        if (v.navigator_url) {
          v.navigator_url = v.navigator_url.replace(/\/main/g, '/index');
        }
      })
      this.setData({
        cateList: result 
      })
    }, (err) => {
      console.log(err)
    })
  },
  getFoorList() { //获取楼层列表
  let _this=this
    request({ url: '/home/floordata' }).then((result) => {
      result= _this.myFn(result);
        // if (navigator_url){
        //   v.navigator_url.replace(/list/g, "list/index");
          
        // }                    
      _this.setData({
        foorList: result
      })
    }, (err) => {
      console.log(err)
    })
  },
 myFn(obj){   //深度遍历替换
    for(let i in obj) {
     console.log(i + ': ' + obj[i]);
      if (i == 'navigator_url') {
        obj[i] = obj[i].replace("goods_list", "goods_list/index");
        console.log(obj[i])
      }
      if (typeof (obj[i]) == 'object') {
        // 判断用户是否要继续迭代   
        this.myFn(obj[i]);
      }
    }
   return obj;
  }

})
