<template>
  <div class="content">
    <div class="box">
      <h4 class="index_title">首页</h4>
      <div class="useInfo" @click="change">
        <div class="usePic">
          <!-- <img src="@/assets/img/morentouxiang@2x.png" alt v-if="icon==''" /> -->
          <img :src="use.icon" alt />
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
          <h4>{{usemonthAmount}}</h4>
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
        <img src="@/assets/img/shoukuanma.jpg" alt @touchstar="touchStar" @touchend="touchEnd" />
        <p>长按保存收款码</p>
      </div>
      <a class="end" :href="'tell://'+customer">
        <img src="@/assets/img/dibu_bohao@2x.png" alt />
        <p>{{use.customer}}</p>
      </a>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import QR from "@/assets/js/qrcode.js"
export default {
  data() {
    return {
      icon: "",
      uid: "",
      customer: "",
      use: {}
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
    // this.uid = JSON.parse(localStorage.getItem("shopInfo")).uid;
    this.creatSc();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    loadData() {
      this.$api
        .post({ uid: this.uid }, "userInfo")
        .then(res => {
          if (res.result == 0) {
            this.use = res;
            this.creatSc(res)
            localStorage.setItem("shopBalance", res.balance);
          }
        })
        .catch(err => {});
    },
    creatSc(e){
        // let val=JSON.stringify({name:e.name,shopId:e.shopId})  
        let val={name:"张山",shopId:"eretr"}  

        this.img=QR.createQrCodeImg(val);
    },
    gotoall(num) {
      switch (num) {
        case 1:
          this.sys_click();
          break;
        case 2:
          this.$router.push("/shoplist");
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
      this.$api.post(url, "auth").then(res => {
        if (res.result == 0) {
          this.$scode(data);
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
    touchStar(e) {
      console.log(e);
    },
    touchEnd(e) {
      console.log(e);
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
}
.van-tabbar-item__icon img {
  width: 0.24rem;
  height: 0.27rem;
  margin-bottom: 0.15rem;
}
.van-hairline--top-bottom::after {
  border: none;
}
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
      margin-top: 0.6rem;
      img {
        width: 1.05rem;
        height: 1.05rem;
      }
      p {
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