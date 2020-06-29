// pages/home/home.js
import dictionary from '../../utils/dictionary.js'
import swiperImg from '../../utils/swiperImg.js'
var app = getApp()
// const utilsTime = require('../../utils/util.js')
Page({
  data: {
    titles:["火车票","飞机票"],
    HFIndex:0,
    isChecked:false,
    isIconClear:false,
    formatTimeList:{},
    img:[],
    application:[
      "/assets/images/extension/coach-extension1.png",
      "/assets/images/extension/jc.png",
      "/assets/images/extension/train-extension4.png",
      "/assets/images/extension/coach-extension4.png",
      "/assets/images/extension/cy.png",
      "/assets/images/extension/bx.png",
      "/assets/images/extension/wyc.png",
      "/assets/images/extension/qbyy.png"
    ],
    applicationTitles:[
      "火车票","机场巴士","酒店","船票",
      "餐饮·特产","出行保险","约车","全部应用"
    ],
    typeValue:""
  },
  onLoad: function (options) {
    this.setData({
      formatTimeList:dictionary.formatTime,
      img: swiperImg.img
    })
    wx.setNavigationBarTitle({
      title: '智行12306',
    });
  },

  //-------------------函数监听事件
  DetailClick(e){
    app.globalDate.appTypeValue = e.detail
    // console.log(e.detail)
  },
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

  onReachBottom: function () {

  },


  onShareAppMessage: function () {

  }
})