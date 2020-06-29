// pages/grofile/childCpns/w-acman/w-acman.js
let app =  getApp();
const DB = wx.cloud.database().collection('userInfo')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin:true,
    userName:"",
    avatarUrl:"",
    gender:"",
    province:"",
    city:"",
    country:"",
    newOpenid:[],
    userInfo:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    acmanClick(){
      let that = this
      wx.navigateTo({
        url: 
        '/pages/grofile/childCpns/w-acman/childCpns/w-crud/w-crud',
        success: function (event) {
          // 通过eventChannel向被打开页面传送数据
          event.eventChannel.emit('acceptDataFromOpenerPage',
           { data: that.data.userInfo })
        }
      })
      // this.triggerEvent("wAcmanClick")
    },
    getUserInfo(){
      let that = this
      that.WXLogin()
      that.setData({
        isLogin:false,
        userName: this.data.userName,
        avatarUrl:this.data.avatarUrl,
        gender:this.data.gender,
        province:this.data.province,
        city:this.data.city,
        country:this.data.country,
      })
    },
    WXLogin(){
      let that = this
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) { 
            wx.getUserInfo({
              success: function(res) {
                let userInfo = res.userInfo
                let nickName = userInfo.nickName
                let avatarUrl = userInfo.avatarUrl
                let gender = userInfo.gender //性别 0：未知、1：男、2：女
                let province = userInfo.province
                let city = userInfo.city
                let country = userInfo.country
                wx.setStorageSync('userName',userInfo.nickName)
                wx.setStorageSync('avatarUrl',userInfo.avatarUrl)
                that.setData({
                  userInfo:userInfo,
                  userName: nickName,
                  avatarUrl:avatarUrl,
                  gender:gender,
                  province:province,
                  city:city,
                  country:country,
                  isLogin:false
                })
                // console.log(app.globalDate.userName)
              }
            })
          }
        }
      })
    }
  },
  lifetimes:{
    attached(){
      let that = this
      // that._getUserIfo()
      that.WXLogin()
    }
  }
  
})
