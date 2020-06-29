export default function(options){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: options.url,
      data:options.data || {},
      method:options.method || "get",
      header:options.header,
      success: resolve,
      fail: reject,
    })
  })
}