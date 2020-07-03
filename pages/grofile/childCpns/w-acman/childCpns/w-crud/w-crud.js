// pages/grofile/childCpns/w-acman/childCpns/w-crud/w-crud.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailItem:{}
  },

  onLoad: function (options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        detailItem: data.data,
      })
    })
   wx.setNavigationBarTitle({
     title: '个人信息',
   });
  },
  TCClick(){
    let that = this
    wx.setStorageSync("userName","")
    wx.switchTab({
      url: '/pages/grofile/grofile'
    })
    
  },
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})