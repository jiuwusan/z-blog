<template>
  <div class="article-box flex">
    <div class="article-list flex">
      <!-- <transition-group name="slideRight" tag="div"> -->
      <ArticleItem
        v-scrollshow="scrollshow"
        v-for="item in articles"
        :key="item.id"
        :data="item"
        ></ArticleItem
      >
      <!-- </transition-group> -->
    </div>
    <div class="classify-list flex">
      <Classify></Classify>
      <Rank class="mgt20"></Rank>
    </div>
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem";
import Classify from "./Classify";
import Rank from "./Rank";

export default {
  data() {
    return {
      articles: [],
      scrollshow: "rotateInDownLeft",
      animatefy:"bounceIn01",
      animateRank:"bounceIn02"
    };
  },
  components: {
    ArticleItem,
    Classify,
    Rank,
  },
  mounted() {
    setTimeout(() => {
      this.articles = [
        { id: "key1" },
        { id: "key2" },
        { id: "key3" },
        { id: "key4" },
        { id: "key5" },
        { id: "key6" },
        { id: "key7" },
        { id: "key8" },
      ];
    }, 500);
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