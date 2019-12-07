<template>
  <div class="changpsw">
    <page-heade :title="text"></page-heade>
    <ul>
      <li>
        <input type="text" v-model="oldpwd" placeholder="请输入原密码" />
      </li>
      <li>
        <input type="password" v-model="newpwd" placeholder="请输入新密码" />
      </li>
      <li>
        <input type="password" v-model="repeatpwd" placeholder="再次输入新密码" />
      </li>
      <div class="btn" @click="SubChange">提交</div>
    </ul>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import pageHeade from "./../components/header";
export default {
  data() {
    return {
      text:"修改密码",
      oldpwd: "",
      newpwd: "",
      repeatpwd: "",
      pwd: "",
      type: "",
      uid: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    pageHeade
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.type=this.$route.query.id;
      this.type==1? this.uid= JSON.parse(localStorage.getItem("qishouInfo")).uid: this.uid= JSON.parse(localStorage.getItem("shopInfo")).uid;  
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  //方法集合
  methods: {
    SubChange() {
        if (this.oldpwd == this.newpwd) {
          this.$toast("新旧密码不能一致!");
        } else 
        if (this.newpwd != this.repeatpwd) {
          this.$toast("新密码输入不一样!");
        }
        //  else if (this.oldpwd != this.pwd) {
        //   this.$toast("原密码输入不正确!");
        // } 
        else {
          let parmas = {
            uid:this.uid,
            oldPassword:hex_md5(this.oldpwd) ,
            newPassword: hex_md5(this.newpwd),
          };
          this.$api.post(parmas,'editPassword').then(res => {
            
            if (res.result == 0) {
              setTimeout(() => {
                this.$router.back(-1);
              },500);
            }
            this.$toast(res.resultNote);
          });
        }
      
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
  beforeDestroy() {

  },
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style scoped lang="less">
.changpsw {
  margin-top: 0.5rem;
  ul {
    padding: 0.2rem;
    li {
      height: 0.65rem;
      line-height: 0.65rem;
      font-size: 0.16rem;
      padding: 0.05rem 0;
      margin-bottom: 0.1rem;
      input {
        flex: 1;
        width: 100%;
        height: 0.6rem;
        border-bottom: 0.01rem solid #e5e5e5;
        padding-left:.1rem; 
      }
    }
  }
  .btn{
    width: 3rem;
    margin: 0 auto;
    margin-top: 0.61rem;
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: center;
    color: #fff;
    border-radius: 22px;
    font-size: 0.18rem;
    background-color: #0081FF;
}
}
</style>