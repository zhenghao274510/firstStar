<template>
  <div class="box">
    <page-head :title="text"></page-head>
    <div class="cont">
      <div class="cont_top">
        <img src="@/assets/img/qianbao@2x.png" alt />
        <div class="con_info">
          <h4>当前账户余额</h4>
          <h2>{{balance}}</h2>
        </div>
      </div>
      <van-tabs
        color="#0081FF"
        title-active-color="#0081FF"
        sticky
        :offset-top="50"
        swipeable
        animated
        :duration="0.5"
        @change="changeIng"
      >
        <!-- :immediate-check="init" -->
        <van-tab :title="v" v-for="(v,k) in tab" :key="k">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finishedTxt"
            @load="onLoad"
            :immediate-check="init"
          >
            <ul class="cont_list">
              <li class="list_swipe" v-for="(item,index) in dataList" :key="index">
                <div class="list_title">
                  <p>{{item.createDate}}</p>
                </div>
                <ul>
                  <li>
                    <div class="list_top">
                      <span>{{item.title}}</span>
                      <span v-if="active==0">-{{item.amount}}</span>
                      <span v-else style="color:#0081FF">+{{item.amount}}</span>
                    </div>
                    <p v-if="item.remarks!=''">备注：{{item.remarks}}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import pageHead from "./../components/header";
export default {
  data() {
    return {
      init: false,
      text: "我的余额",
      tab: ["支出记录", "收入记录"],
      loading: false,
      active: 0,
      finished: false,
      page: 1,
      totalPage: 1,
      dataList: [],
      finishedTxt: "",
      uid: "",
      balance: "",
      timer:null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {
    pageHead
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let shopInfo = localStorage.getItem("shopInfo");
    this.uid = JSON.parse(shopInfo).uid;
    this.balance = localStorage.getItem("shopBalance");
    // this.uid = "a1e3cc23a6604c1fbd1a60a6bfa63e3c";
    this.loadData(this.page, this.active);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    onLoad() {
      if (!this.timer) {
         console.log("loading");
        this.timer = setTimeout(() => {
          this.loading = true;
          if (this.page < this.totalPage) {
            this.page++;
            this.loadData(this.page, this.active);
          } else {
            setTimeout(() => {
              this.loading = false;
              this.finished = true;
              this.finishedTxt = "没有更多了";
            }, 1000);
          }
          this.timer = null;
        }, 1000);
      }
     
    },
    loadData(p, a) {
      let parmas = {
        uid: this.uid,
        type: a,
        pageNo: p,
        pageSize: "10"
      };
      this.$api
        .post(parmas, "balanceLog")
        .then(res => {
          console.log(res);
          this.loading = false;
          res.result == 0
            ? ((this.totalPage = res.totalPage),
              res.dataList != undefined && res.dataList.length != 0
                ? res.dataList.forEach(item => {
                    this.dataList.push(item);
                  })
                : ((this.finished = true), (this.finishedTxt = "暂无相关数据")))
            : this.$toast(res.resultNote);
        })
        .catch(err => {});
    },
    changeIng(e) {
      this.active = e;
      this.initData();
    },
    initData() {
      this.page = 0;
      this.totalPage = 1;
      this.dataList = [];
      this.finished = false;
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
  .cont {
    padding: 0 0.2rem;
    margin-top: 0.5rem;
    .cont_top {
      width: 100%;
      height: 1.01rem;
      display: flex;
      align-items: center;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
      .con_info {
        padding-left: 0.3rem;
        z-index: 99;
        h4 {
          font-size: 0.15rem;
          color: #cfcfcf;
        }
        h2 {
          margin-top: 0.15rem;
          color: #ffe3dd;
          font-size: 0.2rem;
        }
      }
    }
  }
}
.cont_list {
  padding: 0.2rem 0.02rem;
  .list_swipe {
    margin-bottom: 0.2rem;
    .list_title {
      line-height: 0.35rem;
    }
    li {
      border-radius: 8px;
      box-shadow: 0 0 2px 2px rgb(238, 237, 237);
      padding: 0.2rem 0.15rem;
      margin-bottom: 0.1rem;
      .list_top {
        display: flex;
        justify-content: space-between;
        color: #333;
      }
      p {
        font-size: 0.12rem;
        color: #999999;
        margin-top: 0.15rem;
      }
    }
  }
}
</style>