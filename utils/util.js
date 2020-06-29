const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function saveSession(sessionId){
  console.log("------" + sessionId)
  wx.setStorageSync("sessionId", sessionId)
  wx.setStorageSync("sessiondate", Date.parse(new Date))
}

function removeLocalSession(){
  wx.removeStorageSync("sessionId")
  wx.removeStorageSync(sessiondate)
  console.log("删除")
}

function checkSessionTimeout(){
  console.log("--------ok?")
  const sessionId = wx.removeStorageSync("sessionId")
  if(sessionId == null || sessionId==undefined ||sessionId==""){
    return false
  }
  const sessionTime = ex.getStorageSync(sessiondate)
  const aftertimestamp = Date.parse(new Date())
  if(aftertimestamp - sessionTime>=0)
  {
    removeLocalSession()
    return false
  }
  return true
}

function checkSessionOk(){
  const sessionOk = checkSessionTimeout()
  if(!sessionOk)
  {
    requestsessionid()
  }

}

function getDateString(){
  const now = new Date()
  const year = now.getFullYear()
  const mtemp = (now.getMonth() + 1)
  const month = mtemp < 10 ? '0' + mtemp : mtemp

  const dtemp = now.getDate();
  const dataTimees = now.getDate()+1
  
  const day = dtemp < 10 ? '0' + dtemp : dtemp
  const dataTimee = dataTimees < 10 ? '0' + dataTimees : dataTimees
  
  const date = year + '-' + month +'-'+day
  const date2 = year + '-' + month +'-'+dataTimee
  
  return {date,date2}
}

function requestSessionid(){
  const date = getDateString();
  var indexUrl = 'https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=%E5%B9%BF%E5%B7%9E,GZQ&ts=%E5%8C%97%E4%BA%AC,BJP&date='+date.date+'&flag=N,N,Y';
  wx.request({
    url: indexUrl,
    method:"GET",
    success:function(res)
    {
      const sesid = res.header["Set-Cookie"];
      saveSession(sesid)
      setInterval(checkSessionOk,30*60*1000)
    }
  })
}


module.exports = {
  formatTime: formatTime,
  getDateString: getDateString
}
