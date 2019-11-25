<template>
  <div class="contain">
    <page-heade :title="text"></page-heade>
    <div class="box">
      <ul>
        <li style="margin-bottom:10px:height:100px;border:none;">
          <span>修改头像</span>
          <div class="modify_right">
            <van-uploader :after-read="onRead">
              <img :src="this.headImage" alt style="border-radius: 50%;" v-if="this.headImage!=''" />
              <img src="@/assets/img/morentouxiang@2x.png" alt v-else />
            </van-uploader>
            <img
              src="@/assets/img/xiayiye2@2x.png"
              alt
              class="right"
            />
          </div>
        </li>
        <li style="margin-top:20px;">
          <span>昵称</span>
          <div class="modify_right">
            <input type="text" placeholder="请输入昵称" v-model="username" @blur="bao" />
            <img
              src="@/assets/img/xiayiye2@2x.png"
              alt
              class="right"
            />
          </div>
        </li>
        <li @click="goModify">
          <span>账号</span>
          <div class="modify_right">
            <span>{{this.mobile}}</span>
            <img
              src="@/assets/img/xiayiye2@2x.png"
              alt
              class="right"
            />
          </div>
        </li>
           <li @click="changePwd">
          <span>修改密码</span>
          <div class="modify_right">
            <img
              src="@/assets/img/xiayiye2@2x.png"
              alt
              class="right"
            />
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
      text:"个人资料",
      imgs: "",
      username: "", //昵称
      mobile: "", //手机号
      headImage: "", //头像
      url: "",
      type:''
    };
  },
  components: {
    pageHeade
  },
  created() {
    this.type=this.$route.query.id;
  },
  mounted() {},
  methods: {
    back() {
      this.$router.push("/person");
    },
    onRead(file) {
      if (this.imgs.length >= 1) {
        Toast("最多上传1张图片");
      } else {
        this.headImage = file.content;
      }
      var formdata = new FormData();
      formdata.append("file", file.file);
      Request.postFile(formdata)
        .then(res => {
          // console.log(res.data)
          if (res.data.result == 0) {
            this.url = res.data.url;
            console.log(res.data.url);
            this.bao();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    goModify() {
      // this.$router.push("/modify");
    },
    gouserInfo() {
      this.useryin = true;
      let goCarlist = {
        cmd: "",
        cid: this.cid
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res.data);
        })
        .catch(res => {});
    },
    bao() {
      let goCarlist = {
        cmd: "",
        cid: this.cid,
        headImage: this.url,
        nickName: this.username
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res.data);
        })
        .catch(res => {
          Toast("获取失败");
        });
    },
    loginOut() {},
    changePwd(){
      let direct=this.type;
      this.$router.push('/changepsw')
      this.$router.push({
        path:'/changepsw',
        query:{
          id:direct
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.contain {
  width: 100%;
  height: 100%;
  background: #FAFAFA;
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
      background: #FAFAFA;

      li {
        width: 100%;
        height: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.14rem;
        color: #333;
         padding: .2rem;
        border-bottom: 1px solid #eee;
        background: #ffffff;
        &:first-child{
          height:1rem;
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
