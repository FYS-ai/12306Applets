// components/w-back-top/w-back-top.js
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
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //监听返回顶部事件
    handClick()
    {
      //返回顶部函数
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  }
})
