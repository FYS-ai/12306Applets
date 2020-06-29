import request from './netword.js'
const BaseUrl = 'https://api03.6bqb.com/ctrip/detail?apikey=0B007EFE703C5630144FEF43929B0E6E'
export async  function getHotelDetail(itemId,checkIn,checkOut){
  return await  request({
    url:BaseUrl,
    data:{
      itemId:itemId,
      checkIn:checkIn,
      checkOut:checkOut
    }

  })
}