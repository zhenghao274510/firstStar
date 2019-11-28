<template>
  <div class="contain">
    <page-heade :title="text"></page-heade>
    <div class="box">
      <ul>
        <li style="margin-bottom:10px:height:100px;border:none;">
          <span>修改头像</span>
          <div class="modify_right">
            <!-- <van-uploader :after-read="onRead"> -->
              <img :src="icon" alt style="border-radius: 50%;"/>
              <!-- <img src="@/assets/img/morentouxiang@2x.png" alt v-else /> -->
            <!-- </van-uploader> -->
            <img src="@/assets/img/xiayiye2@2x.png" alt class="right" />
          </div>
        </li>
        <li style="margin-top:20px;">
          <span>昵称</span>
          <div class="modify_right">
            <input type="text" placeholder="请输入昵称" v-model="nickname" @blur="change" />
            <img src="@/assets/img/xiayiye2@2x.png" alt class="right" />
          </div>
        </li>
        <li>
          <span>账号</span>
          <div class="modify_right">
            <span>{{account| Admin}}</span>
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
      uid:'',
      nickname:'',
      icon:'',
      account:''
    };
  },
  components: {
    pageHeade
  },
  created() {
    this.type = this.$route.query.id;
    this.uid=JSON.parse(localStorage.getItem('use')).cid;
  },
  mounted() {},
  methods: {
    getuser(){
       this.$api.post({uid:this.uid},'userInfo').then(res=>{
          if(res.result==0){
               this.nickname=res.nickname;
               this.icon=res.icon;
               this.account=res.account;
          }
       })
    },
    onRead(file) {
      if (this.imgs.length >= 1) {
        Toast("最多上传1张图片");
      } else {
        this.headImage = file.content;
      }
      var formdata = new FormData();
      formdata.append("file", file.file);
      this.$api
        .upfile(formdata)
        .then(res => {
          // console.log(res)
          if (res.result == 0) {
            this.url = res.url;
            console.log(res.url);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    save() {
      let parmas = {
        uid: this.cid,
        icon: this.url,
      };
      this.$api
        .post(parmas,'updateIcon')
        .then(res => {
          console.log(res);
          if(res.result==0){
            Toast('上传成功!')
             this.getuser();
          }
        })
        .catch(res => {
          Toast("请求超时!");
        });
    },
    loginOut() {
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
    }
  },
  change(){
     let parmas = {
        uid: this.cid,
        nickname: this.nickname,
      };
      this.$api
        .post(parmas,'updateNickname')
        .then(res => {
          console.log(res);
          if(res.result==0){
            Toast('修改成功!')
          }
        })
        .catch(res => {
          Toast("请求超时!");
        });
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
