// pages/home/childCpns/w-application/childCpns/w-hotelDetail/w-hotelDetail.js
var util = require('../../../../../../utils/util')
import {getHotelDetail}from '../../../../../../service/hotelDetail'
const dataTimes = util.getDateString().date
const dataTimees = util.getDateString().date2
const DB = wx.cloud.database().collection('hotelOrder')
const VAC = wx.cloud.database().collection('assess')
const app =  getApp();

Page({

  data: {
    id:"",
    hotelDetailList:{},
    dataNum:0,
    roomTypess:[],
    vassessList:[],
    imgShowUrl:[],
    hotelNum:0,
    isShoePL:false,
  },

  onLoad: function (options) {
    let that = this
    that.setData({
      id:options.iid
    })
    that._getHotelDetail(that.data.id,dataTimes,dataTimees)
    
    VAC.where({
      hotelId:that.data.id
    }).get({
      success(res){
        const newShowUrl = res.data.map(item=>{
          return item.imgShowUrl
        })
        if (res.data != "") {
          that.setData({
            isShoePL: true,
            vassessList:res.data,
            imgShowUrl:newShowUrl,
            hotelNum:res.data.length
          })
        }
      }
    })
  },
  //-----------------网络请求

  _getHotelDetail(iid,checkIn,checkOut){
    getHotelDetail(iid,checkIn,checkOut).then(res=>{
      // console.log(res)
      const hotelDetailList = res.data.data
      // const roomTypes = res.data.data.roomTypes
      this.setData({
       hotelDetailList:hotelDetailList,
        roomTypess:res.data.data.roomTypes
      })
      wx.setNavigationBarTitle({
        title: hotelDetailList.hotelName,
      })
      // console.log("roomTypes:===> ",res.data.data.roomTypes)
      
      // console.log(this.data.hotelDetailList.roomTypes)
    })
  },


  //----------事件监听
  ZXYDClick(e){
    let that = this
    let userName =  wx.getStorageSync('userName')
    if(userName == ""){
      wx.showModal({
        title: '请登录',
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/grofile/grofile'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      DB.add({
        data:{
          userName:userName,
          hotelName:that.data.hotelDetailList.hotelName,
          roomsType:e.currentTarget.dataset.roomstype,
          imgUrl:e.currentTarget.dataset.imgurl,
          checkIn:dataTimes,
          checkOut:dataTimees,
          hotelId:that.data.id,
          isDisabled:false
        },
        success(res){
          wx.showToast({
            title: '预定成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }
    
    // console.log("------------",e.currentTarget.dataset.index,e)
  },

 
  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})