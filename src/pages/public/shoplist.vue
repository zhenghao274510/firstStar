<template>
  <div class="box">
    <page-heade :title="text"></page-heade>
    <div class="search">
      <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" shape="round" />
      <div slot="action" @click="onSearch">搜索</div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="finishedTxt"
      @load="onLoad"
      :immediate-check="init"
    >
      <ul>
        <li class="useInfo" v-for="(item, index) in dataList" :key="index">
          <div class="usePic">
            <img :src="item.shopIcon" v-if="item.shopIcon!=''" alt />
            <img src="@/assets/img/morentouxiang@2x.png" v-else alt />
          </div>
          <div class="use_title">
            <h3>{{item.shopName}}</h3>
            <p class="over">{{item.address}}</p>
          </div>
          <img src="@/assets/img/shangjia_bohao@2x.png" alt class="right" @click="getphone(item)" />
        </li>
      </ul>
    </van-list>
    <div v-show="show" @click.stop="show=false" class="puop_swipe">
      <div class="puop_con">
        <div class="puop_top">
          <p class="one">联系客服</p>
          <p class="two">{{phone}}</p>
        </div>
        <div class="puop_btn">
          <span class="puop_can" @click.stop="show=false">取消</span>
          <a :href="'tel:/'+phone" class="puop_confirm">一键拨打</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import pageHeade from "./../components/header";
export default {
  data() {
    return {
      init:false,
      text: "商家列表",
      value: "",
      loading: false,
      finished: false,
      init: false,
      page: 1,
      totalPage: 1,
      finishedTxt: "",
      dataList: [],
      uid: "",
      show: false,
      phone: ""
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
    this.uid = this.$route.query.uid;
    this.loadData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    loadData() {
      let parmas = {
        uid: this.uid,
        keyword: this.value,
        pageNo: this.page,
        pageSize: 10
      };
      this.$api
        .post(parmas, "shopList")
        .then(res => {
          this.totalPage = res.totalPage;
          if (res.result == 0) {
            this.loading = false;
            // this.loading==true?this.loading=false:this.loading=true;
            if (res.dataList != undefined && res.dataList.length != 0) {
              res.dataList.forEach(item => {
                this.dataList.push(item);
              });
            } else {
              this.loading = false;
              this.finished = true;
              this.finishedTxt = "暂无相关数据";
            }
          }
        })
        .catch(err => {});
    },
    onSearch() {
      if (this.value == "") {
        this.$toast("请输入关键词!");
      } else {
        this.page = 0;
        this.totalPage = 1;
        this.dataList = [];
        this.onLoad();
      }
    },
    onLoad() {
      this.loading = true;
      if (this.page < this.totalPage) {
        this.page++;
        this.loadData();
      } else {
        setTimeout(() => {
          this.loading = false;
          this.finished = true;
          this.finishedTxt = "没有更多了";
        }, 1500);
      }
    },
    getphone(e) {
      this.phone = e.phone;
      this.show = true;
    }
  },
  watch: {
    value(newv, oldv) {
      if (newv == "") {
        this.dataList = [];
        this.page=1;
        setTimeout(() => {
          this.loadData();
        }, 500);
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
  beforeDestroy() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style scoped lang="less">
.puop_swipe {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
    .one {
      font-weight: bold;
      color: #333333;
    }
    .two {
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
.van-search {
  flex: 1;
}
.box {
  width: 100%;
  .search {
    margin-top: 0.5rem;
    width: 100%;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    background: #fff;
  }
  ul {
    margin-top: 0.1rem;
    .useInfo {
      display: flex;
      width: 100%;
      padding: 0.2rem;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      .usePic {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        img {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
        }
      }
      .right {
        width: 0.24rem;
        height: 0.235rem;
      }
      .use_title {
        flex: 1;
        margin: 0 0.1rem;
      }
    }
  }
}
</style>