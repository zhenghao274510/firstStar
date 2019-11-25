<template>
  <div class="top">
    <div>
      <img src="@/assets/img/fanhui.png" alt="" class="back" @click="back">
      <p>{{title}}</p>
    </div>
  </div>
</template>
<script>
//import 《组件名称》 from '《组件路径》';

export default {
  props: ["title"],
  data() {
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
  
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
  },
  //方法集合
  methods: {
    back() {
      this.$router.go(-1);
     
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
<style scoped lang='less'>

  .top {
    width: 100%;
    height: 0.5rem;
    position: fixed;
    top: 0 ;
    padding: 0 0.15rem;
    z-index: 999;
    background: #fff;
    div {
      position: relative;
      width: 100%;
      .back {
        width: 0.09rem;
        height: 0.17rem;
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      p {
        font-size: 0.17rem;
        line-height: 0.5rem;
        font-weight: bold;
        text-align: center;
      }
    }

}
</style>