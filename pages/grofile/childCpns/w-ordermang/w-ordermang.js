// pages/grofile/childCpns/w-ordermang/w-ordermang.js
const DB = wx.cloud.database().collection('tranOrder')
const HO = wx.cloud.database().collection('hotelOrder')
const FJ = wx.cloud.database().collection('palnOrder')
const QB = wx.cloud.database().collection('QBOrder')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderImg:Array,
    orderTitle:Array
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
    orderClick(e){
      let that = this
      const orderIndexY = e.currentTarget.dataset.index
      if(orderIndexY==0){
        DB.get({
          success(res){
            // console.log(res)
            const orderList = res.data
            that.TiaoZhuan(orderList,orderIndexY)
          }
        })
        
      }else if(orderIndexY==1){
        HO.get({
          success(res){
            const hotelOrder = res.data
            that.TiaoZhuan(hotelOrder,orderIndexY)
          }
        })
      }else if(orderIndexY==2){
        FJ.get({
          success(res){
            const planOrder = res.data
            that.TiaoZhuan(planOrder,orderIndexY)
          }
        })
      }else{
        QB.get({
          success(res){
            const qbOrder = res.data
            that.TiaoZhuan(qbOrder,orderIndexY)
          }
        })
      }
    },
    TiaoZhuan(newOrderItem,numIndex){
      wx.navigateTo({
        url: '/pages/grofile/childCpns/w-ordermang/childCpns/w-orderTotal/w-orderTotal',
        success: function (event) {
          // 通过eventChannel向被打开页面传送数据
          event.eventChannel.emit('acceptDataFromOpenerPage',
           { data: newOrderItem, dataIndex: numIndex})
        }
      })
    }
  }
})
