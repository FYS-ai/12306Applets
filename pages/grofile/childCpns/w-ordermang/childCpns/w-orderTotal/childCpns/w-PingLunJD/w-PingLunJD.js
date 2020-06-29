// pages/grofile/childCpns/w-ordermang/childCpns/w-orderTotal/childCpns/w-PingLunJD/w-PingLunJD.js
const PJJD = wx.cloud.database().collection("assess")
const HOR = wx.cloud.database().collection("hotelOrder")
const SCYFW = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bigImg:[],
    iimg:"",
    titleImg:"",

    aeTimes:"",
    checkIn:"",
    checkOut:"",
    newDetValue:"",
    userName:"",
    roomsType:"",
    newBigImg : [],
    hotelId:"",

    iid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      iimg:'/assets/images/sctp.png',
      titleImg:options.TImgUrl,
      aeTimes:options.aeTimes,
      checkIn:options.checkIn,
      checkOut:options.checkOut,
      roomsType:options.roomsType,
      userName:options.userName,
      hotelId:options.hotelId,
      iid:options.iid
    })
    wx.setNavigationBarTitle({
      title: '发表评论',
    })
  },

  //---------------------------函数监听
  SCTUClick(){
    let that = this;
    wx.chooseImage({
      count:9,//最多能选9张
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let filePath = res.tempFilePaths;
        that.setData({
          bigImg:filePath
        })
        const promiseArr = []
        // console.log(filePath)
        if(filePath.length <= 9){
         for(let i = 0;i< filePath.length;i++){
            let item = filePath[i];
            let suffix = /\.\w+$/.exec(item)[0];
            promiseArr.push(new Promise((reslove, reject) => {
              wx.cloud.uploadFile({
                cloudPath:new Date().getTime() + suffix,
                filePath: filePath[i], // 文件路径
              }).then(resThen=>{
                console.log("上传成功",resThen)
                that.setData({
                  newBigImg:that.data.newBigImg.concat(resThen.fileID)
                })
                reslove()
              }).catch(err=>{})

            }))
            Promise.all(promiseArr).then(res => {})
            wx.showLoading({
              title: '上传中'
            });
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
          }
           
            
        }else{
          wx.showToast({
            title: '最多能选9张',
            'icon': 'none',
            duration: 3000
          })
        }
      }
    })
  },
  texteInput(e){
    this.setData({
      newDetValue:e.detail.value
    })
    // this.detValue = e.detail.value
  },
  FBClick(){
    let that = this
    let avatarUrl = wx.getStorageSync('avatarUrl')
    
    if(that.data.newDetValue != "")
    {
      PJJD.add({
        data:{
          aeContent:that.data.newDetValue,//评论内容
          aeTimes:that.data.aeTimes,//评论时间
          checkIn:that.data.checkIn,//入住时间
          checkOut:that.data.checkOut,//离开时间
          imgShowUrl: that.data.newBigImg,//上传图片
          roomsType:that.data.roomsType,//房型
          userName:that.data.userName,//姓名
          hotelId:that.data.hotelId,//酒店id
          avatarUrl:avatarUrl,//头像
        },
        success: function () {
          // wx.showToast({
          //   title: '图片上传成功',
          //   'icon': 'none',
          //   duration: 3000
          // })
        },
        fail: function () {
          // wx.showToast({
          //   title: '图片上传失败，请检查网络',
          //   'icon': 'none',
          //   duration: 3000
          // })
        }
      }) 
      wx.showToast({
        title: '发表成功',
        'icon': 'none',
        duration: 3000
      })
      wx.showModal({
        title: '是否返回订单页面',
        success(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          } else if (res.cancel) {
            
          }
        }
      })
      this.setData({
        bigImg:[],
        newDetValue:"",
      })
      HOR.where({
        _id:that.data.iid
      }).update({
        data: {
          isDisabled:true
        },
      })

    }else{
      wx.showToast({
        title: '评论内容不能为空',
        'icon': 'none',
        duration: 3000
      })
    }
  },
  QXClick(){
    this.setData({
      bigImg:[],
      newDetValue:"",
    })
    wx.navigateBack({
      delta: 1
    })
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