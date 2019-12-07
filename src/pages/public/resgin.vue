
<template>
  <div class="content">
    <h4 class="index_title">{{text}}</h4>
    <div class="box">
      <div class="img_box">
        <img src="@/assets/img/LOGO@2x.png" alt class="logo" />
        <img src="@/assets/img/xunizhifu@2x.png" alt class="zilogo" />
      </div>

      <ul class="usecon">
        <li>
          <input type="number" placeholder="用户名" name="telphone" v-model="account" />
        </li>
        <!-- <li>
        <input type="number" placeholder="请输入验证码" name="usetext" ref="usema" />
        <i @click="getma" v-text="ma"></i>
        </li>-->
        <li>
          <input type="password" name="usepsd" v-model="password" placeholder="密码" />
        </li>

        <div class="resok" @click="sub">
          <span>登录</span>
        </div>
      </ul>
      <div style="margin-top:.15rem;">用户名和密码请联系客服索取</div>

      <div class="download">
        <a class="pos" :href="'tel://'+phone"></a>
        <img src="@/assets/img/dibu_bohao@2x.png" alt />
        <span>{{phone}}</span>
      </div>
    </div>
  </div>
</template>
<script>
//import 《组件名称》 from '《组件路径》';
// import Request from "@/common/request"
import Request from "@/assets/js/request.js";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      text: "",
      account: "",
      // 用户密码
      password: "",
      pid: "",
      openid: "",
      uid: "",
      phone: "",
      type: 1 // 1  骑手   2  商家
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.type = this.$route.query.id;
    this.openid = this.$route.query.openid;
    this.type == 1 ? (this.text = "骑手端") : (this.text = "商家端");
    this.gettell();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  //方法集合
  methods: {
    gettell() {
      this.$api.post({type:this.type}, "customer").then(res => {
        if (res.result == 0) {
          this.phone = res.phone;
          localStorage.setItem("phone", res.phone);
        }
      });
    },
    sub() {
      this.usepsd == "" ? this.$toast("请输入密码!") : this.loadData();
    },
    loadData() {
      if (this.account == "") {
        this.$toast("账号不能为空!");
      } else if (this.password == "") {
        this.$toast("密码不能为空");
      } else {
        let parmas = {
          account: this.account,
          password: hex_md5(this.password),
          openid: this.openid,
          type: this.type
        };
        this.$api
          .post(parmas, "userLogin")
          .then(res => {
            res.result == 0
              ? ((this.uid = res.uid), this.success())
              : this.$toast(res.resultNote);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    success() {
      this.$toast("登录成功!");
      this.type == 1 ? this.qishouIndex() : this.shopIndex();
    },
    shopIndex() {
      let shopInfo = {
        openid: this.openid,
        uid: this.uid
      };
      localStorage.setItem("shopInfo", JSON.stringify(shopInfo));
      setTimeout(() => {
        this.$router.replace("/shop_index");
      }, 500);
    },
    qishouIndex() {
      let qishouInfo = {
        openid: this.openid,
        uid: this.uid
      };
      localStorage.setItem("qishouInfo", JSON.stringify(qishouInfo));
      setTimeout(() => {
        this.$router.replace("/qishou_index");
      }, 500);
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
<style scoped lang='less' rel='stylesheet/stylus'>
.index_title {
    line-height: 0.35rem;
    font-size: 0.18rem;
    text-align: center;
    background: #fff;
  }
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
}
.box {
  width: 100%;
  padding: 0.3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  .img_box {
    margin-bottom:0.3rem;
    display: flex;
    flex-direction: column;
    .logo {
      width: 0.775rem;
      height: 0.775rem;
    }
    .zilogo {
      margin-top: 0.15rem;
      width: 0.775rem;
    }
  }

  .usecon {
    padding: 0 0.2rem;
    width: 100%;
    li {
      position: relative;
      background: #fff;
      height: 0.4rem;
      margin: 0.15rem 0;
      border-bottom: 1px solid #e4e0e0;
      input {
        flex: 1;
        padding-left: 0.15rem;
        font-size: 0.14rem;
        color: #333333;
        background: #fff;
      }
      input::-webkit-input-placeholder {
        color: #a0a0a0;
        font-size: 0.14rem;
      }
    }
  }

  .ck {
    font-size: 0.13rem;
    color: #bbb;
    display: flex;
    div {
      margin-right: 0.05rem;
      width: 0.2rem;
      height: 0.2rem;
    }
  }
  .resok {
    width: 100%;
    font-size: 0;
    span {
      width: 100%;
      height: 0.4rem;
      margin-top: 0.5rem;
      border-radius: 4px;
      display: block;
      background-color: #0081ff;
      text-align: center;
      line-height: 0.4rem;
      border-radius: 22px;
      color: #fff;
      font-size: 0.17rem;
    }
  }
  .download {
    margin-top: 0.3rem;
    position: relative;
    z-index: 1;
    img {
      width: 0.18rem;
      height: 0.18rem;
      vertical-align: middle;
    }
    span {
      color: #0081ff;
      margin-left: 0.1rem;
    }
    .pos {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 99;
    }
  }
}
</style>