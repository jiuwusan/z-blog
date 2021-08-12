<template>
  <div class="rank-box slideInRight">
    <div class="title">热门文章</div>
    <div class="rank-list flex">
      <div
        class="rank-item"
        v-for="item in list"
        :key="item.uid"
        @click="goDetail(item.uid)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { articleApi } from "@/api";
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    //获取数据
    async query() {
      let result = (await articleApi.topQuery()) || [];
      this.list = result;
    },
    goDetail(uid) {
      if ((this.$route?.path || "").indexOf("/article/detail") > -1) {
        this.$router.replace(`/article/detail/${uid}`);
      } else {
        this.$router.push(`/article/detail/${uid}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.setIdx(@number,@color) {
  &:nth-child(@{number}) {
    &::before {
      background-color: @color;
      color: #fff;
    }
  }
}

.rank-box {
  width: 100%;
  background: #f8f9f7;
  padding: 0 15px 0 20px;
  .title {
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #e8e9e7;
    font-weight: 400;
    border-bottom: 1px solid #e8e9e7;
    color: #383937;
    position: relative;
    font-size: 18px;
  }
  .rank-list {
    width: 100%;
    flex-direction: column;
    padding: 10px 0;
    .rank-item {
      width: 100%;
      font-size: 14px;
      color: #787977;
      display: block;
      position: relative;
      counter-increment: nums;
      padding: 7px 0px 7px 30px;
      overflow: hidden;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: justify;
      cursor: pointer;
      &::before {
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        content: counter(nums, decimal);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 100%;
        background-color: #edefee;
      }
      .setIdx(1,#e24d46);
      .setIdx(2,#2ea7);
      .setIdx(3,#6bc30d);
      &:hover {
        color: #6bc30d;
        text-decoration: underline;
      }
    }
  }
}

.slideInRight {
  animation-name: fadeInUpBig;
  animation-duration: 500ms;
}
</style>