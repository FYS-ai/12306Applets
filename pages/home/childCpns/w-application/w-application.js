// pages/home/childCpns/w-application/w-application.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    application:Array,
    applicationTitles:Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    applicationClick(e){
      wx.navigateTo({
        url: 
        '/pages/home/childCpns/w-application/childCpns/w-childAppLCT/w-childAppLCT',
        success: function (event) {
          // 通过eventChannel向被打开页面传送数据
          event.eventChannel.emit('acceptDataFromOpenerPage',
           { data: e.currentTarget.dataset.index })
        }
      })
      // console.log(e.currentTarget.dataset.index)
    }
  }
})
