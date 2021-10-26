<template>
  <div class="article-box flex">
    <div class="article-list flex">
      <ArticleItem
        v-scrollshow="scrollshow"
        v-for="item in articles"
        :key="item.uid"
        :data="item"
      ></ArticleItem>
    </div>
    <RightBox>
      <Classify></Classify>
      <Label class="mgt20"></Label>
      <Rank class="mgt20"></Rank>
    </RightBox>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import Classify from "./Classify";
import Label from "./Label";
import Rank from "./Rank";
import RightBox from "./RightBox";
import { util } from "@jws";
export default {
  data() {
    return {
      scrollshow: "rotateInDownLeft",
      animatefy: "bounceIn01",
      animateRank: "bounceIn02",
      page: 1,
      pageSize: 10,
      totalSize: 0,
      query: {},
    };
  },
  components: {
    ArticleItem,
    Classify,
    Rank,
    Label,
    RightBox,
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue) {
        if (newValue.path === "/article") {
          let {
            search = "",
            classfiy = "99",
            label = "",
          } = newValue.query || {};
          if (classfiy === "99") {
            classfiy = "";
          }
          let query = {
            search,
            classfiy,
            label,
          };

          this.$store.dispatch("article/setQuery", query);
        }
      },
    },
  },
  computed: {
    articles() {
      return this.$store.state.article.datalist;
    },
  },
  mounted() {
    this.$store.dispatch("archives/init");
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("article/setScrollY");
    next();
  },
  methods: {
    onScroll: util.debounce(function () {
      let innerHeight = document.querySelector("#app").clientHeight;
      let outerHeight = document.documentElement.clientHeight;
      let scrollTop = document.body.scrollTop
        ? document.body.scrollTop
        : document.documentElement.scrollTop;
      // 页面高度 = 屏幕高度 + 滑动高度
      if (innerHeight < outerHeight + scrollTop + 300) {
        this.$store.dispatch("article/pageQuery");
      }
    }, 200),
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

@media screen and (min-width: 751px) {
  .mgt20 {
    margin-top: 20px;
  }

  .article-box {
    min-height: 90vh;
    // width: 100%;
    margin: 20px auto 60px auto;
    justify-content: center;
    position: relative;
    // padding: 0px 0px 40px 0px;
    box-sizing: border-box;
    .article-list {
      width: 960px;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 750px) {
  .mgt20 {
    margin-top: 20px;
  }

  .article-box {
    .box();
    min-height: 90vh;
    width: 100%;
    margin: 20px auto 60px auto;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    .article-list {
      .box();
      padding: 0 15px;
      flex-direction: column;
    }
  }
}

.rotateInDownLeft {
  animation-name: rotateInUpLeft;
  animation-duration: 500ms;
}

.slideInRight {
  animation-name: fadeInUpBig;
  animation-duration: 500ms;
}
</style>