<template>
  <div class="home flex">
    <div class="section flex" v-if="screen">
      <Smage prefix class="banner" :src="screen.profile.cover"></Smage>
      <div class="motto flex">
        <div class="title zoomIn">{{ screen.profile.title }}</div>
        <div class="intro zoomIn">
          {{ screen.profile.motto }}
        </div>
        <div class="btn hover fadeInUpBig" @click="goArticle">
          {{ screen.profile.button }}
        </div>
      </div>
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
import { configApi } from "@/api";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      screen: null,
    };
  },
  mounted() {
    this.getScreen();
  },
  methods: {
    async getScreen() {
      let result = await configApi.findById({
        uid: "fb57a600-eace-11eb-96b5-e73f4408ddb5",
      });
      result.profile && (result.profile = JSON.parse(result.profile));
      this.screen = result;
    },
    goArticle() {
      this.$router.push("article");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.home {
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  .section {
    width: 100%;
    height: 100vh;
    position: relative;
    align-items: center;
    justify-content: center;
    .banner {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
    }
    .motto {
      z-index: 19;
      position: relative;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 28px;
        color: #fff;
        text-align: center;
      }

      .intro {
        font-size: 14px;
        color: #fff;
        text-align: center;
        letter-spacing: 10px;
        margin: 20px 0;
      }

      .btn {
        margin-top: 20px;
        display: inline-block;
        height: 38px;
        line-height: 38px;
        padding: 0 18px;
        background-color: #1e9fff;
        color: #fff;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border: none;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
}

.fadeInDownBig {
  animation-name: fadeInDownBig;
  animation-duration: 800ms;
}

.zoomIn {
  animation-name: zoomIn;
  animation-duration: 800ms;
}

.fadeInUpBig {
  animation-name: fadeInUpBig;
  animation-duration: 800ms;
}
</style>
