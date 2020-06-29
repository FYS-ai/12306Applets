// pages/detail/detail.js
const DB = wx.cloud.database().collection('tranOrder')
import {
  getTrainTicket
} from '../../service/trainTicket'
const app =  getApp();
const bacTop = 300
Page({

  data: {
    detailItem:{},
    date: "",
    trainList: [], //列表
    // winHeight: 600,
    currentTab: "1",
    newTicketList:[],
    isSnaTickList:true,
    rotateD:135,
    rotateIndex:"x",
    NoTranimg:'',
    remark:"",
    
    isBacTop:false
  },
  appType :"",
  appYMD :"",
  appORG:"",
  appTMN:"",
  onLoad: function (options) {
    let that = this
    console.log(options)
    const YMD = options.dYMD

    const ORG = options.dRG
    const TMN = options.dTMN
    const Type = options.type
    const  ORGTMN = ORG+'------>'+TMN
    that.appORG = ORG
    that.appTMN  = TMN
    that.appType = Type
    that.appYMD = YMD
    wx.setNavigationBarTitle({
      title: ORGTMN,
    })
    this.setData({
      ORGTMN:ORGTMN
    })
    that._getTrainTicket(YMD,ORG,TMN,Type)
  },
  _getTrainTicket(YMDS,ORGS,TMNS,NType){
    getTrainTicket(YMDS,ORGS,TMNS,NType).then(res =>
      {
        const remark = res.data.showapi_res_body.remark=="查询成功！"
        this.setData({
          remark:remark
        })
        if(res.data.showapi_res_body.remark=="查询成功！"){
          const trans = res.data.showapi_res_body.trains
          const newTickets = trans.map(b=>b.tickets)
          this.setData({
            trainList:trans,
            newTicketList:newTickets
          })
        }else{
          this.setData({
            NoTranimg:"/assets/images/wzd.png"
          })
        }
      })
  },
  snaTickClick(e){
    const rotateIndex = e.currentTarget.dataset.index
    this.setData({
      rotateIndex:rotateIndex,
      isSnaTickList:!this.data.isSnaTickList
      
    })
    // DB.add({
    //   data:{
    //   }
    // })
    
  },


  QPButClick(e){
    // console.log(e)
    const price = e.currentTarget.dataset.price//价格
    const seatname = e.currentTarget.dataset.seatname//座位类型
    const trainNum = e.currentTarget.dataset.trainnum
    const filtertime = e.currentTarget.dataset.filtertime//历时长
    const arrivalStation = e.currentTarget.dataset.arrivalstation//起点
    const arrivalTime = e.currentTarget.dataset.arrivaltime//起点时间
    const departStation = e.currentTarget.dataset.departstation//终点
    const departTime = e.currentTarget.dataset.departtime//终点时间
    const newType = this.appType==2?'学生票':'普通票'//票类型
    const newYMD = this.appYMD 
    const userName = wx.getStorageSync('userName')//用户名
    // const tranOrderList = {price,seatname,filtertime,arrivalStation,arrivalTime,departStation,departTime,newYMD}
    if(userName!=""){
      DB.add({
        data:{
          arrivalStation:arrivalStation,
          arrivaltime:arrivalTime,
          dateTime:newYMD,//日期
          departStation:departStation,
          departtime:departTime,
          trainNum:trainNum,
          filtertime:filtertime,//历时
          price:price,
          seatname:seatname,
          type:newType,//类型
          userName:userName,
        },
        success:function(res){
          wx.showToast({
            title: '购票成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }else{
      wx.showModal({
        title: '请登录',
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../grofile/grofile',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
    console.log('----',price,seatname,filtertime,arrivalStation,arrivalTime,departStation,departTime,newType,newYMD,userName)

  },


  beforeDay(){
    var bDay = parseInt(this.appYMD)-1
    // console.log(bDay)
    this._getTrainTicket(bDay,this.appORG,this.appTMN,this.appType)
  },
  nextDay(){
    var bDay = parseInt(this.appYMD)+ 1
    // console.log(bDay)
    this._getTrainTicket(bDay,this.appORG,this.appTMN,this.appType)
  },

  onPageScroll(options){
    const bacTopScroll = options.scrollTop
    const flag = bacTopScroll >=bacTop
    if(flag != this.data.isBacTop){
      this.setData({
        isBacTop:flag
      })
    }
  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})