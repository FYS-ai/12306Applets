// pages/home/childCpns/w-website/w-website.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isIconClear:String,
    titles:{
      type:Array,
      value:[]
    },
    formatTimeList:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    HFIndex:0,
    isImg:true,
    isShowPopup:false,
    isIconClear2:"",
    inputText:"",
    ifKSZD:false,
    ksItem:"哈尔滨",
    zdItem:"北京",
    startTimeYear:"",//年
    startTime:"",//月
    startTimeDay:""//日
  },

  /**
   * 组件的方法列表-
   */
  methods: {
    
    myTimes(){
      const year = new Date().getFullYear()
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      this.setData({
        isIconClear2: this.properties.isIconClear,
        startTimeYear: year,
        startTime: month,
        startTimeDay: day
      })
    },

    startTimeConform(){
      if(this.data.startTime == ""){
        wx.showToast({
          title: '日期不能为空',
          icon: 'none'
        })
        this.setData({
          startTime: new Date().getMonth() + 1
        })
      }

    },
    startTimeDayConform(){
      if(this.data.startTimeDay == ""){
        wx.showToast({
          title: '日期不能为空',
          icon: 'none'
        })
        this.setData({
          startTimeDay: new Date().getDate()
        })
      }
    },
    startTimeInput(e){
      this.setData({
        startTime:e.detail.value
      })
    },
    startTimeDayInput(e){
      this.setData({
        startTimeDay:e.detail.value
      })
    },

    CXButClick(){
      const origin = this.data.ksItem
      const terminus = this.data.zdItem

      const TimeYear = this.data.startTimeYear
      const TimeMonth = this.data.startTime
      const month = TimeMonth > 10 ? TimeMonth : '0' + TimeMonth
      const TimeDay = this.data.startTimeDay
      const day = TimeDay > 10 ? TimeDay : '0' + TimeDay
      const newYMD = `${TimeYear}${month}${day}`
      // const DatOriTer = {newYMD,origin,terminus}
      wx.navigateTo({
        url: '/pages/detail/detail?dYMD='+newYMD+'&dRG='+origin+'&dTMN='+terminus+'&type='+app.globalDate.appTypeValue
      })
    },

    formatTimeList(e){
      // console.log(e.currentTarget.dataset.index)
      if(this.data.ifKSZD == false){
        this.setData({
          ksItem:e.currentTarget.dataset.item.name
        })
      }
      if(this.data.ifKSZD == true){
        this.setData({
          zdItem:e.currentTarget.dataset.item.name
        })
      }
      this.hideModal()
      // console.log(e.currentTarget.dataset.item.name)
    },

    inputTextClick(e){
      this.setData({
        inputText:e.detail.value
      })
    },
    inputFocusClick(){
      this.setData({
        isIconClear2:!this.properties.isIconClear
      })
    },
    ClearClick(){
      this.setData({
        inputText:"",
        isIconClear2:!this.data.isIconClear2
      })
      this.triggerEvent("wClearClick")
    },
    confirmClick(){
      if(this.data.inputText != ""){
        if(this.data.ifKSZD == false){
          this.setData({
            ksItem : this.data.inputText
          })
        }
        if(this.data.ifKSZD == true){
          this.setData({
            zdItem : this.data.inputText
          })
        }
        this.hideModal()
      }else{
        wx.showToast({
          title: '站点不能为空',
          icon: 'none'
        })
      }
      this.triggerEvent("wConfirmClick")
    },

    HCFJClick(e) {
      let that = this
      that.setData({
        HFIndex: e.currentTarget.dataset.index
      })
      that.triggerEvent("websiteHCFJClick",this.data)
    },

    websiteImgClick1(){
      let that = this
      that.setData({
        isImg: !that.data.isImg,
        ksItem: this.properties.zdItem,
        zdItem:this.properties.ksItem
      })
      that.triggerEvent("websiteImg1")
    },
    websiteImgClick2(){
      let that = this
      that.setData({
        isImg: !that.data.isImg,
        ksItem: this.properties.zdItem,
        zdItem: this.properties.ksItem
      })
      that.triggerEvent("websiteImg2")
    },

    ksClick() {
      let that = this
      that.setData({
        ifKSZD:false
      })
      that.showModal()
      that.triggerEvent("websiteksClick")
    },
    zdClick() {
      let that = this
      that.setData({
        ifKSZD:true
      })
      that.showModal()
      that.triggerEvent("websitezdClick")
    },

    //----------------------------显示对话框
    showModal() {
      const isShowPopup = true
      //防止遮罩下面的页面滑动
      this.setData({
        isShowPopup: isShowPopup
      })
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
      this.triggerEvent("comShowModal")
    },
    //--------------------隐藏对话框
    hideModal() {
      //防止遮罩下面的页面滑动
      const isShowPopup = false
      this.setData({
        isShowPopup: isShowPopup,
        inputText: "",
        isIconClear2:false
      })
      // 隐藏遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
      }.bind(this), 200)
    }
  },
  lifetimes:{
    //加载到页面就会被执行
    attached:function(){
      this.myTimes()
    }
  }
})
