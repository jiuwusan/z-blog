<template>
  <div class="flex page-bg" v-show="!isMobile">
    <div class="page-content flex">
      <Header></Header>
      <router-view />
    </div>
    <Footer></Footer>
  </div>
  <Mobile v-show="isMobile"></Mobile>
</template>
<script>
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Mobile from "@/views/Mobile";
import { util } from "@jws";
export default {
  data() {
    return {
      animationName: "",
      isMobile: false,
    };
  },
  components: {
    Footer,
    Header,
    Mobile,
  },
  mounted() {
    this.$store.dispatch("profile/init");
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        // this.valiMobile();
        if (to?.path !== from?.path) {
          this.animationName = "zoom";
        }
      },
    },
  },
  methods: {
    valiMobile() {
      let result = util.isMobile();
      this.isMobile = result;
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

.mobile-box {
  width: 100%;
}

.page-bg {
  width: 100%;
  flex-direction: column;
  background-image: url(./assets/image/bg01.jpg);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  overflow-x: hidden;
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
