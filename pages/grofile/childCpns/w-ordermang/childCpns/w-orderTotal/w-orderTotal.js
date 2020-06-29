// pages/grofile/childCpns/w-ordermang/childCpns/w-orderTotal/w-orderTotal.js
const JDDD = wx.cloud.database().collection('hotelOrder')
const netTimess = require('../../../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList:[],
    orderIndexY:"",
    HMDDImg:"",
    isDisabled:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      // console.log(data)
      if(data.data!=""){
        that.setData({
          detailList: data.data,
          orderIndexY:data.dataIndex
        })
      }else{
        that.setData({
          HMDDImg:"/assets/images/HMDD.png"
        })
      }
      switch(that.data.orderIndexY){
        case 0:
          wx.setNavigationBarTitle({
            title: '火车票订单',
          })
          break;
        case 1:
          wx.setNavigationBarTitle({
            title: '酒店订单',
          })
          break;
        case 2:
          wx.setNavigationBarTitle({
            title: '飞机票订单',
          })
          break;
        case 3:
          wx.setNavigationBarTitle({
            title: '全部订单',
          })
          break;
        
      }
      that.ISDisab()
    })
    
    
  },
  onShow(){
    let that = this
    that.ISDisab()
  },
  
  //----------------------函数监听
  ISDisab(){
    let that = this
    JDDD.get({
      success: res => {
        const newIsDisabled = res.data.map(item => {
          return item.isDisabled
        })
        that.setData({
          isDisabled: newIsDisabled
        })
        // console.log(newIsDisabled)
      }
    })
  },

  PJClick(x){
    let that = this
    let listIndex = x.currentTarget.dataset.indexx
    let newDetailList = that.data.detailList[listIndex]
    
    const checkIn = newDetailList.checkIn//入住时间
    const checkOut = newDetailList.checkOut//离开时间
    const TImgUrl = newDetailList.imgUrl//酒店图片
    const roomsType = newDetailList.roomsType//房间型号
    const userName = newDetailList.userName//姓名
    const hotelId = newDetailList.hotelId//酒店名称
    const aeTimes = netTimess.getDateString().date//评论时间
    let iid = that.data.detailList[listIndex]._id
    wx.navigateTo({
      url:'/pages/grofile/childCpns/w-ordermang/childCpns/w-orderTotal/childCpns/w-PingLunJD/w-PingLunJD?checkIn='+checkIn+'&checkOut='+ checkOut+'&roomsType='+roomsType+'&userName='+userName +'&aeTimes='+aeTimes+'&TImgUrl='+TImgUrl+'&hotelId='+hotelId+'&iid='+iid
    })
    
    // console.log(,x.currentTarget.dataset.indexx)
    // console.log("------评价",x.currentTarget.dataset.indexx)
  },
  ZCYDClick(y){
    let that = this
    let listIndex = y.currentTarget.dataset.indexx
    let newData = that.data.detailList[listIndex]
    // console.log(newData)
    wx.showModal({
      title: '确定再次预定吗',
      success (res) {
        if (res.confirm) {
          JDDD.add({
            data:{
              checkIn:netTimess.getDateString().date,
              checkOut:netTimess.getDateString().date2,
              hotelName:newData.hotelName,
              imgUrl:newData.imgUrl,
              roomsType:newData.roomsType,
              userName:newData.userName
            },
            success(res){
              wx.showLoading({
                title: '预定成功'
              });
              setTimeout(function () {
                wx.hideLoading()
              }, 1000)
              JDDD.get({
                success(res){
                  that.setData({
                    detailList:res.data
                  })
                }
              })
            }
          })
          
        } else if (res.cancel) {}
      }
    })
    // console.log("-------再次预定",y.currentTarget.dataset.indexx)
  },
  SCClick(z){
    let that = this
    let listIndex = z.currentTarget.dataset.indexx
    let iid = that.data.detailList[listIndex]._id
    JDDD.doc(iid).remove({
      success(res){
        wx.showLoading({
          title: '删除成功'
        });
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        JDDD.get({
          success(res){
            that.setData({
              detailList:res.data
            })
          }
        })
      }
    })
    // console.log("-----删除订单",z.currentTarget.dataset.indexx)
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