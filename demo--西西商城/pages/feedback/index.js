// pages/feedback/index.js
Page({
  data: {
    chooseImage:[],
    textVal:"",
    tabs: [
      {
        id: 0,
        isActive: true,
        value: "体验问题"
      },
      {
        id: 1,
        isActive: false,
        value: "商品，商品投诉"
      }
    ]
  },
  UploadImages:[],
  handleItemchange(e) {
    const { index } = e.detail;
    const { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  handleChooseImg(){
    let _this=this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        _this.setData({
          chooseImage: [..._this.data.chooseImage,...res.tempFilePaths]
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  handleDeletImg(e) {
    let { index } = e.currentTarget.dataset;
    let {chooseImage}=this.data;
    chooseImage.splice(index,1 );
    this.setData({
      chooseImage
    })
  },
  handleInputChange(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  handleFormSubmit(){
    let _this=this
    const { textVal,chooseImage}=_this.data;
    if (!textVal.trim()){
      wx.showToast({
        title: "输入不合法",
        icon:"none",
        mask:true
      })
      return;
    }
    wx.showToast({
      title: "正在上传",
      icon: "loading",
      mask: true
    })
    if (chooseImage.length != 0){
      chooseImage.forEach((v,i)=>{
        wx.uploadFile({
          url: 'https://images.ac.cn/api/upload',   //上传到哪里
          filePath: v, //上传的路径
          name: 'image',   //后台调用图片时的别名
          formData: {
            apiType:"ali",
            token:"cee3b5e683e93cd557aa6fa40591"
          },  //顺带的文本信息
          success: function (res) {      
            let { data } = JSON.parse(res.data);
            let url = data.url.distribute ;
            _this.UploadImages.push(url);
            if (i === chooseImage.length-1){
              _this.setData({
                textVal: "",
                chooseImage: []
              });
              wx.navigateBack({
                delta: 1
              })
            }
          },
          fail: function (res) { 
            wx.showToast({
              title: "上传失败",
              showCancel: false,
              mask: true
            })
          },
          complete:function(){
            wx.hideToast();
          }
        })
      })
    }else{
      _this.setData({
        textVal: "",
        chooseImage: []
      });
      wx.navigateBack({
        delta: 1
      })
    }
  }
})