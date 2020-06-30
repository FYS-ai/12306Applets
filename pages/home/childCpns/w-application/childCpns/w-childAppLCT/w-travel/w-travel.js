// pages/home/childCpns/w-application/childCpns/w-childAppLCT/w-travel/w-travel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    travel:[
      "/assets/images/travel/1.png",
      "/assets/images/travel/2.png",
      "/assets/images/travel/3.png"
    ],
    cxindex:'',
    CXBX:[
      "铁路旅客人身意外伤害保险条款 (A款)",
      "铁路旅客人身意外伤害保险 (指定行程) 投保",
      "铁路旅客人身意外伤害保险 (指定行程) 常见"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cxindex:options.cxindex
    })
    wx.setNavigationBarTitle({
      title: this.data.CXBX[this.data.cxindex],
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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