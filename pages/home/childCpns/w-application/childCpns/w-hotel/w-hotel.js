// pages/home/childCpns/w-application/childCpns/w-hotel/w-hotel.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotelList:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hotelDetail(e){
      // console.log(e.currentTarget.dataset.index)
      this.triggerEvent('hotelClick',e.currentTarget.dataset.index)
    }
  },

  lifetimes:{
    attached:function(){
      // console.log(this.properties.hotelList)
    }
  },

})
