//app.js
App({
  onLaunch: function () {
    let that = this
    wx.cloud.init({
      env:"f12306-bdwha"
    })
  },
 

  globalDate:{
    userName:'',
    appYypeValue:"",
    isDisabled:true
  }
})