// pages/grofile/childCpns/w-ordermang/childCpns/w-orderTotal/childCpns/w-tranOrder/w-tranOrder.js
const DB = wx.cloud.database().collection('tranOrder')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailList:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    iid:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    removeOrder(e){ 
      let that =this
      this.setData({
        iid:e.currentTarget.dataset.id
      })
      
      DB.doc(this.data.iid).remove({
        success(res){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          DB.get().then(res=>{
            that.setData({
              detailList:res.data
            })
          })
        }
      })
    }
  },
  lifetimes:{
    attached(){
      // console.log(this.properties.detailList)
    }
  }
})
