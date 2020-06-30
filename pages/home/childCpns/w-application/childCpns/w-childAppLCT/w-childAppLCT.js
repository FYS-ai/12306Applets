// pages/home/childCpns/w-application/childCpns/w-childAppLCT/w-childAppLCT.js
import dictionary from '../../../../../../utils/dictionary.js'
var util = require('../../../../../../utils/util')
import {getHotel} from '../../.../../../../../../service/hotel'

const dataTimes = util.getDateString().date
const dataTimees = util.getDateString().date2
const backTop=300
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailItem:"",

    //w-website组件数据
    titles:["火车票"],
    JP:["机票"],
    CP:["船票"],
    HFIndex:0,
    isChecked:false,
    isIconClear:false,
    formatTimeList:{},

    //酒店数据
    hotelList:{
      page:1,
      list:[]
    },
    id:'',

    //
    appLCT1:[
      "/assets/images/extension/train-extension4.png",
      "/assets/images/extension/coach-extension4.png",
      "/assets/images/extension/cy.png",
      "/assets/images/extension/bx.png",
      "/assets/images/extension/wyc.png"
    ],
    appLCT2:[
      '/assets/images/QBYY/hy.png',
      '/assets/images/QBYY/ka.png',
      '/assets/images/QBYY/sc.png',
      '/assets/images/QBYY/sjk.png',
      '/assets/images/QBYY/xxt.png',
    ],

    appTitles1:[
      "酒店","船票",
      "餐饮·特产","出行保险","约车"
    ],
    appTitles2:[
      "铁路会员","铁路e卡通",
      "扶贫商城","中铁手机卡","休息厅"
    ],
    WNTJ:"为您推荐",
    CXFW:"出行服务",
    
    isBackTop:false,

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
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      that.setData({
        detailItem: data.data,
        formatTimeList:dictionary.formatTime
      })
    })
    that. _detailItem(that.data.detailItem)
    that._getHotel(dataTimes,dataTimees)
    // console.log(that.data.detailItem)
  },


  //-----------------网络请求--------------------------
  _getHotel(checkIn,checkOut){
    const page = this.data.hotelList.page+1
    getHotel(page,checkIn,checkOut).then(res=>{
      const list = res.data.data
      const oldList = this.data.hotelList.list
      oldList.push(...list)
      const typeKey = `hotelList.list`
      const pageKey = `hotelList.page`;
      this.setData({
        [typeKey]:oldList,
        [pageKey]:page
      })
      // console.log(this.data.hotelList.list)
    })
  }, 
  
  
  //---------------------------w-website组件监听函数
  _detailItem(e){
    switch (e) {
      case 0:
        wx.setNavigationBarTitle({
          title: '火车票',
        });
        break;
      case 1:
        wx.setNavigationBarTitle({
          title: '机场巴士',
        });
        break;
      case 2:
        wx.setNavigationBarTitle({
          title: '酒店',
        });
        break;
      case 3:
        wx.setNavigationBarTitle({
          title: '船票',
        });
        break;
      case 4:
        wx.setNavigationBarTitle({
          title: '餐饮·特产',
        });
        break;
      case 5:
        wx.setNavigationBarTitle({
          title: '出行保险',
        });
        break;
      case 6:
        wx.setNavigationBarTitle({
          title: '约车',
        });
        break;
      case 7:
        wx.setNavigationBarTitle({
          title: '全部应用',
        });
        break;
    }
  },
  
  hotelDetailClick(e){
    // console.log(e.detail)
    const that = this
    const num = e.detail
    that.setData({
      id:that.data.hotelList.list[num].id
    })
    wx.navigateTo({
      url:'/pages/home/childCpns/w-application/childCpns/w-hotelDetail/w-hotelDetail?iid='+that.data.id
    })
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

  onPageScroll(options){
    const backScroll = options.scrollTop
    const flag = backScroll >= backTop
    if(flag !=this.data.isBackTop){
      this.setData({
        isBackTop:flag
      })
    }
  },

  //--------出行保险事件监听
  CXClick(e){
    const cxindex = e.currentTarget.dataset.cxindex
    wx.navigateTo({
      url:'./w-travel/w-travel?cxindex='+cxindex
    })
    // console.log(e.currentTarget.dataset.cxindex)
  },

  //全部应用点击事件
  // appLCTClick1(){

  // },
  onPullDownRefresh: function () {

  },

  onReachBottom()
  {
    // console.log("到达底部")
    this._getHotel(dataTimes,dataTimees)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})