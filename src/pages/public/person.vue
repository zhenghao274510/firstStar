<template>
  <div class="contain">
    <page-heade :title="text"></page-heade>
    <div class="box">
      <ul>
        <li style="margin-bottom:10px:height:100px;border:none;">
          <span>修改头像</span>
          <div class="modify_right">
            <img :src="icon" alt style="border-radius: 50%;" v-if="icon!=''" />
            <img src="@/assets/img/morentouxiang@2x.png" alt v-else />
            <input type="file" class="input" @change="Upfiles" />
            <img src="@/assets/img/xiayiye2@2x.png" alt class="right" />
          </div>
        </li>
        <li style="margin-top:20px;">
          <span>昵称</span>
          <div class="modify_right">
            <input type="text" placeholder="请输入昵称" v-model="nickname" @blur="changeName" />
            <img src="@/assets/img/xiayiye2@2x.png" alt class="right" />
          </div>
        </li>
        <li>
          <span>账号</span>
          <div class="modify_right">
            <span>{{account|Admin}}</span>
            <img src="@/assets/img/xiayiye2@2x.png" alt class="right" />
          </div>
        </li>
        <li @click="changePwd">
          <span>修改密码</span>
          <div class="modify_right">
            <img src="@/assets/img/xiayiye2@2x.png" alt class="right" />
          </div>
        </li>
      </ul>
      <div class="btn" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
// import Request from "@/common/js/request";
import pageHeade from "./../components/header";
import { Toast } from "vant";
export default {
  data() {
    return {
      text: "个人资料",
      imgs: "",
      url: "",
      type: "",
      uid: "",
      nickname: "",
      icon: "",
      account: ""
    };
  },
  components: {
    pageHeade
  },
  created() {
    this.type = this.$route.query.id;
    this.type == 1
      ? (this.uid = JSON.parse(localStorage.getItem("qishouInfo")).uid)
      : (this.uid = JSON.parse(localStorage.getItem("shopInfo")).uid);
      this.getuser();
  },
  mounted() {},
  methods: {
    getuser() {
      this.$api.post({ uid: this.uid }, "userInfo").then(res => {
        if (res.result == 0) {
          this.nickname = res.nickname;
          this.icon = res.icon;
          this.account = res.account;
        } else {
          this.$toast(res.resultNote);
        }
      });
    },
    Upfiles() {
      var event = event || window.event;
      var file = event.target.files[0];
      var formdata = new FormData();
      formdata.append("file", file);
      this.$api.upfile(formdata)
        .then(res => {
          // console.log(res)
          if (res.result == 0) {
            this.save(res.url);
            console.log(res.url);
          } else {
            this.$toast(res.resultNote);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    save(url) {
      let parmas = {
        uid: this.uid,
        icon:url
      };
   this.$api
        .post(parmas, "updateIcon")
        .then(res => {
          console.log(res);
          this.$toast(res.resultNote);
          if (res.result == 0) {
            this.getuser();
          }
        })
        .catch(res => {});
    },
    loginOut() {
      // this.$router.replace({path:'/resgin',query:{id:this.type,back:1,openid:}})
      this.type == 1
        ? localStorage.removeItem("qishouInfo")
        : localStorage.removeItem("shopInfo");
      document.addEventListener(
        "WeixinJSBridgeReady",
        function() {
          WeixinJSBridge.call("closeWindow");
        },
        false
      );
      WeixinJSBridge.call("closeWindow");
    },
    changePwd() {
      this.$router.push({
        path: "/changepsw",
        query: {
          id: this.type
        }
      });
    },
    changeName() {
      let parmas = {
        uid: this.uid,
        nickname: this.nickname
      };
      this.$api
        .post(parmas, "updateNickname")
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            Toast("修改成功!");
          }else{
            Toast(res.resultNote);
          }
        })
        .catch(res => {
          Toast("请求超时!");
        });
    }
  }
};
</script>

<style scoped lang="less">
.contain {
  width: 100%;
  height: 100%;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      background: #fafafa;

      li {
        width: 100%;
        height: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.14rem;
        color: #333;
        padding: 0.2rem;
        border-bottom: 1px solid #eee;
        background: #ffffff;
        &:first-child {
          height: 100px;
          position: relative;
          .input {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            opacity: 0;
          }
        }
        .modify_right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 0.55rem;
            height: 0.55rem;
          }
          .right {
            width: 0.06rem;
            height: 0.1rem;
            margin-left: 0.3rem;
          }

          input {
            text-align: right;
            background: #fff;
          }
        }
      }
    }
  }
  .btn {
    width: 3rem;
    margin: 0 auto;
    margin-top: 0.61rem;
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: center;
    color: #333333;
    border-radius: 22px;
    font-size: 0.18rem;
    background-color: #ffffff;
    border: 1px solid #dddddd;
  }
}
</style>
