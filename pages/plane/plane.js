// pages/plane/plane.js
import swiperImg from '../../utils/swiperImg.js'
import dictionary from '../../utils/dictionary.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:[],

    //w-website
    titles:["单程","往返"],
    HFIndex:0,
    isChecked:false,
    isIconClear:false,
    formatTimeList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img:swiperImg.img,
      formatTimeList:dictionary.formatTime
    })
    wx.setNavigationBarTitle({
      title: '飞机票',
    });
  },

  //-----------w-website页面事件监听
  ClearClick(e){},
  HCFJClick(e){
    let that = this
    that.setData({
      HFIndex: e.detail.HFIndex
    })
  },

  websiteImgClick1(){},
  websiteImgClick2(){},
  
  ksClick(){

    // console.log("--------------")
  },
  zdClick(){
    // console.log("--------------")
  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})