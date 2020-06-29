import request from './netword.js'

const baseURL = 'http://route.showapi.com/1651-1?showapi_sign=a034431b1c714da7854d521bc0b5d70f&showapi_appid=269515'
export function getTrainTicket(date,arrivalStation,departStation,type){
  return request({
    url:baseURL,
    data:{
      date,
      arrivalStation,
      departStation,
      type
    }
  })
}