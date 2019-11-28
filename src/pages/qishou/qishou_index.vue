<template>
  <div class="content">
    <div class="box">
      <h4 class="index_title">首页</h4>
      <div class="useInfo" @click.stop="change">
        <div class="usePic">
          <img src="@/assets/img/morentouxiang@2x.png" alt v-if="icon==''" />
          <img :src="use.icon" alt v-else />
        </div>
        <div class="use_title">
          <h3>{{use.nickname}}</h3>
          <p>{{use.account|Admin}}</p>
        </div>
        <img src="@/assets/img/xiayiye@2x.png" alt class="right" />
      </div>
      <div class="top-bar">
        <van-tabbar :fixed="false" active-color="#666">
          <van-tabbar-item @click.stop="gotoall(1)">
            <span>我的余额</span>
            <img slot="icon" src="@/assets/img/wodeyue@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click.stop="gotoall(2)">
            <span>商户列表</span>
            <img slot="icon" src="@/assets/img/shangjia_shangjialiebiao@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click.stop="gotoall(3)">
            <span>意见反馈</span>
            <img slot="icon" src="@/assets/img/shangjia_yijianfankui@2x.png" />
          </van-tabbar-item>
          <van-tabbar-item to @click.stop="gotoall(4)">
            <span>联系客服</span>
            <img slot="icon" src="@/assets/img/qishou_yue@2x.png" />
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <div class="shao_cont">
      <div @click.stop="sys_click">
        <img src="@/assets/img/shangjia_saoyisao@3x.png" alt />
        <p>扫一扫支付</p>
      </div>
    </div>
    <div v-show="show" @click.stop="show=false" class="puop_swipe">
      <div class="puop_con">
        <div class="puop_top">
          <p class="one">联系客服</p>
          <p class="two"> {{use.customer}}</p>
        </div>
        <div class="puop_btn">
          <span class="puop_can" @click.stop="show=false">取消</span>
          <a :href="'tel://'+use.customer" class="puop_confirm">一键拨打</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
export default {
  data() {
    return {
      show: false,
      uid:'',
      use:{}
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
    this.uid=JSON.parse(localStorage.getItem("qishouInfo")).uid;
      this.loadData()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    loadData(){
      this.$api.post({uid:this.uid},'userInfo').then(res=>{
          if(res.result==0){
              this.use=res;
              localStorage.setItem('qishouBalance',res.balance)
          }
      }).catch(err=>{})
    },
    gotoall(num) {
      switch (num) {
        case 1:
          this.$router.push("/qishou_money");
          break;
        case 2:
          this.$router.push("/shoplist");
          break;
        case 3:
         this.$router.push({path:"/yijian",query:{id:1}});
          break;
        case 4:
          this.show = true;
          break;
      }
    },
    sys_click() {
      let url = location.href.split("#")[0];
      this.$api.post(url,'auth').then(res => {
         if(res.result==0){
           this.$scode(res);
         }
      });
    },
    change() {
      this.$router.push({
        path: "/person",
        query: {
          id: 1
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
.puop_swipe {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.puop_con {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 5px;
  width: 3rem;
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 99;
  .puop_top {
    p {
      line-height: 0.35rem;
      text-align: center;
    }
    .one{
      font-weight: bold;
      color: #333333;
    }
    .two{
      color: #666;
    }
  }
  .puop_btn {
    display: flex;
    justify-content: space-around;
    .puop_can {
      width: 1rem;
      height: 0.3rem;
      line-height: 0.3rem;
      display: block;
      border-radius: 15px;
      text-align: center;
      border: 1px solid #ccc;
      color: #333333;
    }
    .puop_confirm {
      width: 1rem;
      height: 0.3rem;
      line-height: 0.3rem;
      display: block;
      border-radius: 15px;
      text-align: center;
      background: #0081ff;
      color: #fff;
    }
  }
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