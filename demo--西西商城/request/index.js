let ajaxTimes = 0
export const request=(params) =>{
  let header = { ...params.header };
  if(params.url.includes("/my/")){
    let { token } = wx.getStorageSync('token');
    header["Authorization"] = token;
  }
  ajaxTimes++
  wx.showLoading({
    title:"加载中..."
  })
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject) =>  {wx.request({
      ...params,
      header,
      url: baseUrl+params.url,
      success: function(res) {
        resolve(res.data.message)
      },
      fail: function(res) {
        reject(res)
      },
      complete(){
        ajaxTimes--
        if (ajaxTimes==0){
           wx.hideLoading();
        }
      }
    })
  }) 
}