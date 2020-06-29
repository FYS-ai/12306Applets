import request from './netword.js'
const BaseUrl = 'https://api03.6bqb.com/ctrip/global/list?apikey=0B007EFE703C5630144FEF43929B0E6E'
export function getHotel(page,checkIn,checkOut){
  return request({
    url:BaseUrl,
    data:{
      cityId:110,
      page:page,
      order:0,
      startPrice:0,
      endPrice:0,
      checkIn:checkIn,
      checkOut:checkOut
    }

  })
}