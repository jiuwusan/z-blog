<template>
  <div class="article-box flex">
    <div class="article-list flex">
      <!-- <transition-group name="slideRight" tag="div"> -->
      <ArticleItem
        v-scrollshow="scrollshow"
        v-for="item in articles"
        :key="item.uid"
        :data="item"
      ></ArticleItem>
      <!-- </transition-group> -->
    </div>
    <div class="classify-list flex">
      <Classify></Classify>
      <Label class="mgt20"></Label>
      <Rank class="mgt20"></Rank>
    </div>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import Classify from "./Classify";
import Label from "./Label";
import Rank from "./Rank";
import { articleApi } from "@/api";
import { util } from "@jws";
export default {
  data() {
    return {
      articles: [],
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
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue) {
        let { search = "", classfiy = "99", label = "" } = newValue.query || {};
        if (classfiy === "99") {
          classfiy = "";
        }
        let query = {
          search,
          classfiy,
          label,
        };
        this.query = query;
        this.loadData(1, query);
      },
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    async pageQuery(page, query) {
      page = page || this.page || 1;
      query = query || this.query || {};
      if (page === 1) {
        this.articles.splice(0, this.articles.length);
      }
      if (this.totalSize > 0 && this.totalSize <= this.articles.length) {
        //数据已经全部加载
        return;
      }

      let result = await articleApi.pageQuery({ page, pageSize: 10, ...query });
      Array.prototype.push.apply(this.articles, result?.datalist || []);
      this.totalSize = result?.totalSize;
      this.page = result?.page + 1;
    },
    onScroll() {
      let innerHeight = document.querySelector("#app").clientHeight;
      let outerHeight = document.documentElement.clientHeight;
      let scrollTop = document.body.scrollTop
        ? document.body.scrollTop
        : document.documentElement.scrollTop;
      // 页面高度 = 屏幕高度 + 滑动高度
      if (innerHeight < outerHeight + scrollTop + 300) {
        this.loadData();
      }
    },
    loadData: util.debounce(function (page, query) {
      this.pageQuery(page, query);
    }, 500),
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.mgt20 {
  margin-top: 20px;
}

.article-box {
  min-height: 90vh;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  margin-top: 20px;
  .article-list {
    width: 960px;
    flex-direction: column;
  }
  .classify-list {
    margin-left: 20px;
    flex-direction: column;
    width: 260px;
  }
}

.rotateInDownLeft {
  animation-name: rotateInUpLeft;
  animation-duration: 500ms;
}
</style>