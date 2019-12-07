<template>
  <div class="box">
    <page-heade :title="text"></page-heade>
    <div class="content">
      <h4>付款给{{name}}</h4>
      <ul>
        <li>
          <p>金额</p>
          <div>
            ￥
            <input type="number" placeholder="请输入金额" v-model="amount" />
          </div>
        </li>
        <li>
          <p>备注</p>
          <div>
            <input type="text" placeholder="请输入备注信息(选填)" v-model="remarks" />
          </div>
        </li>
      </ul>
      <div class="btn" @click="payMoney">和商户已确认，立即支付</div>
      <p class="ok">付款时请确认商户信息是否正确</p>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import pageHeade from "./../components/header";
import {Toast} from "vant"
export default {
  data() {
    return {
      name: "",
      text: "扫码支付",
      amount: "",
      remarks: "",
      shopId: "",
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
    this.name = this.$route.query.nickname;
    this.shopId = this.$route.query.shopId;
    this.uid = this.$route.query.uid;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    payMoney() {
      let parmas = {
        shopId: this.shopId,
        amount: this.amount,
        remarks: this.remarks,
        uid: this.uid
      };
      this.$api.postLoading(parmas, "pay").then(res => {
        Toast(res.resultNote);
        if (res.result == 0) {
        this.$router.back();
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
.box {
  width: 100%;
  height: 100%;
  .content {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0.5rem 0.3rem 0 0.3rem;
    h4 {
      line-height: 0.35rem;
    }
    ul {
      background: #fff;
      width: 100%;
      border-radius: 20px;
      margin: 0.3rem 0;
      li {
        height: 1rem;
        border-bottom: 1px solid #dddddd;
        margin-bottom: 0.15rem;
        display: flex;
        flex-direction: column;
        padding-left: 0.1rem;
        justify-content: space-around;
      }
    }
    .btn {
      width: 3rem;
      margin: 0 auto;
      height: 0.44rem;
      line-height: 0.44rem;
      text-align: center;
      color: #fff;
      border-radius: 22px;
      font-size: 0.18rem;
      background-color: #0081ff;
    }
    .ok {
      text-align: center;
      line-height: 0.35rem;
      color: #999999;
    }
  }
}
</style>