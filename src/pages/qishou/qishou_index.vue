<template>
  <div class="content">
    <div class="box">
      <h4 class="index_title">首页</h4>
      <div class="useInfo" @click="change">
        <div class="usePic">
          <img src="@/assets/img/morentouxiang@2x.png" alt v-if="icon==''" />
          <img :src="icon" alt v-else />
        </div>
        <div class="use_title">
          <h3>用户名称</h3>
          <p>电话</p>
        </div>
        <img src="@/assets/img/xiayiye@2x.png" alt class="right" />
      </div>
      <div class="top-bar">
        <van-tabbar :fixed="false" active-color="#666">
          <van-tabbar-item @click="gotoall(1)">
            <span>我的余额</span>
            <img slot="icon" src="@/assets/img/wodeyue@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click="gotoall(2)">
            <span>商户列表</span>
            <img slot="icon" src="@/assets/img/shangjia_shangjialiebiao@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click="gotoall(3)">
            <span>意见反馈</span>
            <img slot="icon" src="@/assets/img/shangjia_yijianfankui@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click="gotoall(4)">
            <span>联系客服</span>
            <img slot="icon" src="@/assets/img/qishou_yue@2x.png" />
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <div class="shao_cont">
      <div @click="sys_click">
        <img src="@/assets/img/shangjia_saoyisao@3x.png" alt />
        <p>扫一扫支付</p>
      </div>
    </div>
    <van-popup :show="show" @click.stop="show=false"> <div class="puop_con">
      </div> </van-popup>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import { Dialog } from "vant";
export default {
  data() {
    return {
      icon: "",
      show: false,
      kefuPhone: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    gotoall(num) {
      switch (num) {
        case 1:
          this.$router.push("/qishou_money");
          break;
        case 2:
          this.$router.push("/shoplist");
          break;
        case 3:
          this.$router.push("/yijian");
          break;
        case 4:
          this.callTell();
          //  this.$router.push("/shoplist");
          break;
      }
    },
    sys_click() {
      this.url = location.href.split("#")[0];
      this.post(this.url).then(res => {
        this.$scode(res)
        // let that = this;
      });
    },
    callTell() {
      let phone = this.kefuPhone;
      phone = "18703858281";
      Dialog.confirm({
        title: "联系客服",
        message: phone,
        confirmButtonText: "一键拨号",
        confirmButtonBackgroundColor: "#0081FF",
        cancelButtonText: "取消",
        cancelButtonColor: "#0081FF"
      })
        .then(() => {
          // wx.makePhoneCall({
          //   phoneNumber: phone
          // });
           let a=document.createElement('a');
           a.href="tell://"+phone;
           a.click();
        })
        .catch(() => {
          console.log("取消");
        });
    },
    change() {
      this.$router.push("/person");
      this.$router.push({
        path: "/person",
        query: {
          id: 0
        }
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
}
.van-tabbar-item__icon img {
  width: 0.24rem;
  height: 0.27rem;
}
.van-hairline--top-bottom::after {
  border: none;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .shao_cont {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    img {
      width: 1.3rem;
      height: 1.3rem;
    }
    p {
      text-align: center;
      margin-top: 0.26rem;
      font-size: 0.16rem;
      color: #333333;
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