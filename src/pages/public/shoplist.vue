<template>
  <div class="box">
    <page-heade :title="text"></page-heade>
    <div class="search">
      <van-search v-model="value" placeholder="请输入搜索关键词"  @search="onSearch" shape="round" />
      <div slot="action" @click="onSearch">搜索</div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="finishedTxt"
      @load="onLoad"
      :offset="10"
    >
      <ul>
        <li class="useInfo" v-for="(item, index) in items" :key="index">
          <div class="usePic">
            <img src="@/assets/img/morentouxiang@2x.png" alt />
          </div>
          <div class="use_title">
            <h3>{{item.shopName}}</h3>
            <p>{{item.phone}}</p>
          </div>
          <img src="@/assets/img/shangjia_bohao@2x.png" alt class="right" />
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import pageHeade from "./../components/header";
export default {
  data() {
    return {
      text: "商家列表",
      value: "",
      loading:false,
      finished:false,
      init:false,
      page:0,
      totalPage:1,
      finishedTxt:'没有更多了',
      dataList:[],
      uid:''
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
    // this.loadData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
      loadData() {
      let parmas = {
        uid:this.uid,
        keyword:this.value,
        pageNo:this.page,
        pageSize:10
      };
      this.$api
        .post(parmas,"shopList")
        .then(res => {
          this.totalPage=res.totalPage;
          if (res.result == 0) {
            this.loading=false;
            // this.loading==true?this.loading=false:this.loading=true;
            if(res.dataList!=undefined && res.dataList.length!=0){
              res.dataList.forEach(item=>{
                this.dataList.push(item);
              })
            }else{
              this.loading=false;
              this.finished=true;
              this.finishedTxt="暂无相关数据"
            }
          }
        })
        .catch(err => {});
    },
    onSearch() {
      if(this.value==""){
        this.$toast('请输入关键词!')
      }else{
        this.dataList=[];
        this.loadData();
      }
    },
    onLoad(){
       this.loading=true;
       if(this.page<this.totalPage){
           this.page++;
           this.loadData()
       }else{
         setTimeout(()=>{
           this.loading=false;
           this.finished=true;
           this.finishedTxt="没有更多了"
         },1500)
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
.van-search{
  flex: 1;
}
.box {
  width: 100%;
  .search {
    margin-top: 0.5rem;
    width: 100%;
    padding: 0 .2rem;
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
      }
      .right {
        width: 0.24rem;
        height: 0.235rem;
      }
      .use_title {
        flex: 1;
        margin-left: 0.25rem;
      }
    }
  }
}
</style>