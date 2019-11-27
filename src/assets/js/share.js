// wx.updateAppMessageShareData、wx.updateTimelineShareData
import wx from 'weixin-js-sdk'
import { Toast } from "vant";
function share(data,title,desc,link,imgUrl){
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId:data.appId, // 必填，公众号的唯一标识
    timestamp:data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature,// 必填，签名
    jsApiList: ["updateTimelineShareData","updateAppMessageShareData"] // 必填，需要使用的JS接口列表
  });
  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用 好友
    wx.updateAppMessageShareData({ 
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 设置成功
        

      }
    })
  });
  wx.ready(function () {   //需在用户可能点击分享按钮前就先调用  朋友圈   QQ空间
    wx.updateTimelineShareData({ 
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 设置成功
        

      }
    })
  });
}




