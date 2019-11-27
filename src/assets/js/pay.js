import {
  Toast
} from "vant"
import wx from "weixin-js-sdk";
const pay = {
  onBridgeReady(data) {
    WeixinJSBridge.invoke(
      "getBrandWCPayRequest", {
        appId: data.appId, //公众号名称，由商户传入
        timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
        nonceStr: data.nonceStr, //随机串
        package: data.prepay,
        signType: data.signType, //微信签名方式：
        paySign: data.paySign //微信签名
      },
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          Toast('支付成功!')

        } else {
          Toast('交易失败!')
        }
      }
    );
  }
  // wxPay(data) {
  //   wx.chooseWXPay({
  //     timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
  //     nonceStr: '', // 支付签名随机串，不长于 32 位
  //     package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
  //     signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
  //     paySign: '', // 支付签名
  //     success: function (res) {
  //       // 支付成功后的回调函数
  //     }
  //   })
  // }
}
export default pay;
