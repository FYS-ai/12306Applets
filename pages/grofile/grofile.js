// pages/grofile/grofile.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderImg:[
      "/assets/images/extension/coach-extension1.png",
      "/assets/images/extension/dd.png",
      "/assets/images/tabbar/plane-selected.png",
      "/assets/images/extension/qbdd.png"
    ],
    orderTitle:["火车票订单","酒店订单","机票订单","全部订单"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心',
    });
  },

  //----------函数监听事件
  // AcmanClick(){
  //   console.log("-------")
  // },



  onPullDownRefresh: function () {

  },

 
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})