<template>
  <div class="home flex">
    <div class="section flex" v-if="screen">
      <Smage prefix class="banner" :src="screen.cover"></Smage>
      <div class="motto flex">
        <div class="title zoomIn">{{ screen.title }}</div>
        <div class="intro zoomIn">
          {{ screen.motto }}
        </div>
        <div class="btn hover fadeInUpBig" @click="goArticle">
          {{ screen.button }}
        </div>
      </div>
    </div>
    <div class="home-menu">
      <Menu></Menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      // screen: null,
    };
  },
  computed: {
    screen() {
      return this.$store.state.profile.index;
    },
  },
  methods: {
    goArticle() {
      this.$router.push("article");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";
@media screen and (min-width: 751px) {
  .home-menu {
    z-index: 999;
    position: fixed;
    top: 30px;
    right: 30px;
  }

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
}

//宽度0-750px
@media screen and (max-width: 750px) {
  .home-menu {
    z-index: 999;
    position: fixed;
    top: 25px;
    right: 25px;
  }

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
          line-height: 36px;
          padding: 0 35px;
        }

        .intro {
          font-size: 12px;
          color: #fff;
          text-align: center;
          letter-spacing: 6px;
          margin: 20px 0;
          padding: 0 15px;
          line-height: 24px;
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
