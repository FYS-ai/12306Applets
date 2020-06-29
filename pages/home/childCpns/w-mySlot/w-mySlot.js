// pages/home/childCpns/w-mySlot/w-mySlot.js
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
    GTStudent:["普通票","学生票"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ptCheck(e){
      const typeValue = e.detail.value
      this.triggerEvent("detailClick",typeValue)
      // console.log(e.detail.value)
    }
  }
})
