// pages/home/childCpns/w-application/childCpns/w-mapLocation/w-mapLocation.js
var amapFile = require('../../../../../../libs/amap-wx')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    DLWZ:{},
    markers:[{
      iconPath: "/assets/location.png",
      id: 0,
      latitude: "",
      longitude: "",
      width: 50,
      height: 50
    }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/assets/location.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getWeather: function() {
      var that = this;
      var myAmapFun = new amapFile.AMapWX({key:"d617431bd84965f9642e050a240d5922"});
      wx.getSystemInfo({
        success: function(data){
          var height = data.windowHeight;
          var width = data.windowWidth;
          var size = width + "*" + height;
          wx.getLocation({
            type:"gcj02",
            isHighAccuracy:true,
            success: function(res){
              myAmapFun.getRegeo({
                success: function (data) {
                  that.setData({
                    DLWZ:data[0],
                    markers:[{
                      id:data[0].id,
                      latitude: data[0].latitude,
                      longitude: data[0].longitude,
                      width: 50,
                      height: 50
                    }]
                  })
                },
                fail: function (info) {
                  //失败回调
                  console.log(info)
                }
              })
             
            }
          })
  
        }
      })
    }
    
  },
  lifetimes:{
    attached:function(){
      this._getWeather();
    }
  }
})
