<template>
  <div class="article-detail-box flex">
    <div class="article-content">
      <RichText :content="detailData.content"></RichText>
    </div>
    <div class="classify-list flex">
      <Classify></Classify>
      <Rank class="mgt20"></Rank>
      <div class="slideInRight backpage mgt20" @click="goBack">
        <Icon class="icon" name="backpage"></Icon>
        <div class="text">返回列表</div>
      </div>
    </div>
  </div>
</template>

<script>
import Classify from "./Classify";
import Rank from "./Rank";
import { articleApi } from "@/api";
import { RichText } from "@jws/components";
// import { util } from "@jws";
export default {
  data() {
    return {
      detailData: {},
    };
  },
  components: {
    Classify,
    RichText,
    Rank,
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue) {
        if ((newValue?.path || "").indexOf("/article/detail") > -1) {
          this.findById();
        }
      },
    },
  },
  mounted() {},
  methods: {
    async findById() {
      let { uid } = this.$route.params || {};
      let result = await articleApi.findById({ uid });
      this.detailData = result;
      if (result?.title) {
        document.title = result.title;
      }
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.mgt20 {
  margin-top: 20px;
}

.article-detail-box {
  min-height: 90vh;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  margin-top: 20px;
  .article-content {
    width: calc(21cm + 2px);
    padding: 1cm 1.2cm;
    background-color: #fff;
    margin-bottom: 50px;
  }
  .classify-list {
    margin-left: 20px;
    flex-direction: column;
    width: 260px;
    .backpage {
      .flex();
      align-items: center;
      border-radius: 8px;
      padding: 10px;
      background: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      .icon {
        font-size: 26px;
      }
      .text {
        font-size: 22px;
        margin-left: 10px;
        color: #787977;
        &:hover {
          color: #52c01a;
        }
      }
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