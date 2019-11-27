<template>
  <div class="box">
    <page-head :title="text"></page-head>
    <div class="cont">
      <div class="cont_top">
        <img src="@/assets/img/qianbao@2x.png" alt />
        <div class="con_info">
          <h4>当前账户余额</h4>
          <h2>200</h2>
        </div>
      </div>

      <van-tabs
        color="#0081FF"
        title-active-color="#0081FF"
        sticky
        :offset-top="60"
        swipeable
        animated
        :duration="0.5"
        @change="changeIng"
      >
        <van-tab :title="v" v-for="(v,k) in tab" :key="k">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finishedTxt"
            @load="onLoad"
            :offset="10"
            :immediate-check="init"
          >
            <ul class="cont_list">
              <li class="list_swipe">
                <div class="list_title">
                  <p>时间</p>
                </div>
                <ul>
                  <li>
                    <div class="list_top">
                      <span v-if="active==0">4564564564564</span>
                      <span v-else>提现</span>
                      <span>154564</span>
                    </div>
                    <p v-if="active==0">45645645645</p>
                  </li>
                  <li>
                    <div class="list_top">
                      <span v-if="active==0">4564564564564</span>
                      <span v-else>提现</span>
                      <span>154564</span>
                    </div>
                    <p v-if="active==0">45645645645</p>
                  </li>
                </ul>
              </li>
              <li class="list_swipe">
                <div class="list_title">
                  <p>时间</p>
                </div>
                <ul>
                  <li>
                    <div class="list_top">
                      <span v-if="active==0">4564564564564</span>
                      <span v-else>提现</span>
                      <span>154564</span>
                    </div>
                    <p v-if="active==0">45645645645</p>
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
      text: "我的余额",
      tab: ["收入", "支出"],
      loading: false,
      avtive: 0,
      finished: false,
      init: false,
      page: 1,
      totalPage: 1,
      dataList: [],
      finishedTxt: ""
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
    this.cid = JSON.parse(shopInfo).cid;
    this.loadData(this.page, thia.active);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    onLoad() {
      this.loading = true;
      if (this.page < this.totalPage) {
        this.page++;
        this.loadData(this.page, thia.active);
      } else {
        setTimeout(() => {
          this.loading = false;
          this.finished = true;
          this.finishedTxt = "没有更多了";
        }, 2000);
      }
    },
    loadData(p, a) {
      let parmas = {
        cmd: "",
        cid: this.cid,
        type: a,
        page: p
      };
      this.$api
        .post(parmas)
        .then(res => {
          this.loading == true ? (this.loading = false) : (this.loading = true);
          res.result == 0
            ? ((this.totalPage = res.totalPage),
              res.dataList != undefined && res.dataList.length != 0
                ? res.dataList.forEach(item => {
                    this.dataList.push(item);
                  })
                : ((this.finished = true), (this.finishedTxt = "暂无相关数据")))
            : this.$toast("请求失败!请稍后重试!");
          // if(res.result==0){
          //   this.totalPage=res.totalPage;
          //   if(res.dataList!=undefined && res.dataList.length!=0){
          //     res.dataList.forEach(item=>{
          //       this.dataList.push(item);
          //     })
          //   }else{
          //     this.finished=true;
          //     this.finishedTxt="暂无相关数据"
          //   }
          // }
        })
        .catch(err => {});
    },
    changeIng(e) {
      this.active = e;
      this.initData();
    },
    initData() {
      this.page = 1;
      this.totalPage = 1;
      this.dataList = [];
      this.finished = false;
      this.loadData(this.page, this.active);
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