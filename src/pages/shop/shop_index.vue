<template>
  <div class="content">
    <div class="box">
      <h4 class="index_title">首页</h4>
      <div class="useInfo" @click="change">
        <div class="usePic">
          <img src="@/assets/img/morentouxiang@2x.png" alt v-if="use.icon==''" />
          <img :src="use.icon" v-else alt />
        </div>
        <div class="use_title">
          <h3>{{use.nickname}}</h3>
          <p>{{use.account|Admin}}</p>
        </div>
        <img src="@/assets/img/xiayiye@2x.png" alt class="right" />
      </div>
      <ul class="shop_money">
        <li @click="gotoall(3)">
          <h4>{{use.todayAmount}}</h4>
          <p>今日收益</p>
        </li>
        <li @click="gotoall(3)">
          <h4>{{use.monthAmount}}</h4>
          <p>本月收益</p>
        </li>
        <li @click="gotoall(3)">
          <h4>{{use.balance}}</h4>
          <p>账户余额</p>
        </li>
      </ul>
    </div>
    <div class="shao_cont">
      <div class="top-bar">
        <van-tabbar :fixed="false">
          <van-tabbar-item @click="gotoall(1)">
            <span>扫一扫</span>
            <img slot="icon" src="@/assets/img/shangjia_saoyisao@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click="gotoall(2)">
            <span>商户列表</span>
            <img slot="icon" src="@/assets/img/shangjia_shangjialiebiao@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click="gotoall(3)">
            <span>交易明细</span>
            <img slot="icon" src="@/assets/img/shangjia_jiaoyimingxi@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click="gotoall(4)">
            <span>意见反馈</span>
            <img slot="icon" src="@/assets/img/shangjia_yijianfankui@2x.png" />
          </van-tabbar-item>
        </van-tabbar>
      </div>
      <div class="con_bottom">
        <div id="qrcode" class="qrcode" style="display:none"></div>
        <div class="qrcode" id="imgcon"></div>
        <p class="shou">长按保存收款码</p>
      </div>
      <a class="end" :href="'tel://'+use.customer">
        <img src="@/assets/img/dibu_bohao@2x.png" alt />
        <p>{{use.customer}}</p>
      </a>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import QRCode from "qrcodejs2";
import wx from "weixin-js-sdk";

export default {
  data() {
    return {
      icon: "",
      uid: "",
      use: {},
      show: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.uid = JSON.parse(localStorage.getItem("shopInfo")).uid;
    // this.uid="a1e3cc23a6604c1fbd1a60a6bfa63e3c"
    this.loadData(this.uid);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    loadData(uid) {
      this.$api
        .post({ uid:uid}, "userInfo")
        .then(res => {
          console.log(res)
          if (res.result == 0) {
            
            this.use = res;
            let info = JSON.stringify({
              nickname: res.nickname,
              shopId:uid
            });
            this.creatQrcode(info);
            localStorage.setItem("shopBalance", res.balance);
          }
        })
        .catch(err => {});
    },
    creatQrcode(e) {
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: e,
        width: 110,
        height: 110
      });
        let canvas = document.getElementsByTagName("canvas")[0];
        console.log(canvas);
        let img = this.getimg(canvas);
        document.getElementById("imgcon").append(img);
    },
    getimg(canvas) {
      var image = new Image();
      // canvas.toDataURL 返回的是一串Base64编码的URL
      image.src = canvas.toDataURL("image/png");
      return image;
    },
    gotoall(num) {
      switch (num) {
        case 1:
          this.sys_click();
          break;
        case 2:
          this.$router.push({ path: "/shoplist", query: { uid: this.uid } });
          break;
        case 3:
          this.$router.push("/shop_money");
          break;
        case 4:
          this.$router.push({ path: "/yijian", query: { id: 2 } });
          break;
      }
    },
    sys_click() {
      let url = location.href.split("#")[0];
      this.$api.post({ url: url }, "auth").then(res => {
        if (res.result == 0) {
          this.Scrode(res, this.uid);
        } else {
          this.$toast(res.resultNote);
        }
      });
    },
    change() {
      this.$router.push({
        path: "/person",
        query: {
          id: 2
        }
      });
    },
    Scrode(data, uid) {
      wx.config({
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        debug: false,
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
      wx.ready(() => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success(r) {
            let arr = eval("(" + r.resultStr + ")");
            that.$router.push({
              path: "/pay",
              query: {
                nickname: arr.nickname,
                shopId: arr.shopId,
                uid: uid
              }
            });
          },
          fail: function(res) {
            // alert("扫码出错了2：" + res.errMsg);
            Toast("扫码出错了!" + res.errMsg);
          },
          complete: function(res) {}
        });
      });
    }
  },
  //生命周期 - 创建之前
  beforeCreate() {},
  //生命周期 - 挂载之前
  beforeMount() {},
  //生命周期 - 更新之前
  beforeUpdate() {},
  //生命周期 - 更新之后
  updated() {},
  //生命周期 - 销毁之前
  beforeDestroy() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style scoped lang="less">
.van-tabbar {
  height: 1rem;
  background: #fafafa;
  font-size: 0.14rem;
  color: #333333;
}
.van-tabbar-item__icon img {
  width: 0.24rem;
  height: 0.27rem;
  margin-bottom: 0.15rem;
}
.van-hairline--top-bottom::after {
  border: none;
}
// #img
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%,-50%);
//   width: 2rem;
//   height: 2rem;
//   opacity: 0;
//
.shop_money {
  display: flex;
  background: #fff;
  padding: 0.2rem 0;
  li {
    flex: 1;
    text-align: center;
  }
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .shao_cont {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background: #fafafa;
    padding-bottom: 0.5rem;
    .top-bar {
      background: #fafafa;
    }
    .con_bottom {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 0.2rem;
      position: relative;
      .qrcode {
        width: 1.05rem;
        height: 1.05rem;
        z-index: 1;
      }
      #img {
        width: 1.05rem;
        height: 1.05rem;
        z-index: 999;
      }
    }

    .shou {
      text-align: center;
      margin-top: 0.26rem;
    }
  }
  .end {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    img {
      width: 0.18rem;
      height: 0.18rem;
    }
    p {
      color: #0081ff;
      margin-left: 0.1rem;
    }
  }
}

.box {
  width: 100%;
  background: #fafafa;
  .index_title {
    line-height: 0.35rem;
    font-size: 0.18rem;
    text-align: center;
    background: #fff;
  }
}
.useInfo {
  display: flex;
  width: 100%;
  padding: 0.16rem;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .usePic {
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    img {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
    }
  }
  .right {
    width: 0.1rem;
    height: 0.2rem;
  }
  .use_title {
    flex: 1;
    margin-left: 0.125rem;
  }
}
</style>