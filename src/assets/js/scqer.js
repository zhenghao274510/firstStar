import wx from "weixin-js-sdk";
import {Toast} from "vant"
const Scrode = (data) => {
  wx.config({
    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    debug: true,
    // 必填，公众号的唯一标识
    appId: data.appId,
    // 必填，生成签名的时间戳
    timestamp: data.timestamp,
    // 必填，生成签名的随机串
    nonceStr: data.noncestr,
    // 必填，签名
    signature: data.signature,
    // 必填，需要使用的JS接口列表，所有JS接口列表
    jsApiList: ["checkJsApi", "scanQRCode"]
  });
  const that = this;
  wx.ready(function () {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (r) {
        Toast("扫码成功" + r.resultStr);
        let arr = r.resultStr;
        that.$router.push({
          path:"/pay",
          query:{
            id:arr
          }
        })
       
      },
      fail: function (res) {
        // alert("扫码出错了2：" + res.errMsg);
        Toast('扫码出错了!' + res.errMsg)
      },
      complete: function (res) {}
    });
  });
}
export default Scrode;
