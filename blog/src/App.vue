<template>
  <div class="flex page-bg">
    <div class="page-content flex">
      <Header></Header>
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
  data() {
    return {
      animationName: "",
    };
  },
  components: {
    Footer,
    Header,
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.animationName = "zoom";
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/global.less";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: @defaultWidth;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-bg {
  width: 100%;
  flex-direction: column;
  background-image: url(./assets/image/bg01.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  .page-content {
    width: 100%;
    flex-direction: column;
    min-height: 100vh;
  }
}

.zoom-enter-active {
  animation-name: zoomIn;
  animation-duration: 400ms;
}
</style>
