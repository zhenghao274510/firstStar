<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import setFont from "@/assets/setFont/setFont.js";
export default {
  data() {
    return {
      transitionName: "",
      height:document.body.clientHeight||document.documentElement.clientHeight
    };
  },
  components: {},
  mounted() {
       let num=this.height;
    window.onload =()=>{
      document.getElementsByTagName('html')[0].style.height=num+'px';
      setFont.setrem()
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  }
};
</script>

<style>
@import url("./assets/css/commont.css");
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background: #fff;
}
</style>
