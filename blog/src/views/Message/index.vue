<template>
  <div class="message-box">
    <Guest></Guest>
    <div class="board-box fadeInUpBig flex">
      <Board v-scrollshow="scrollshow"></Board>
      <Board v-scrollshow="scrollshow"></Board>
      <Board v-scrollshow="scrollshow"></Board>
      <Board v-scrollshow="scrollshow"></Board>
      <Board v-scrollshow="scrollshow"></Board>
      <Board v-scrollshow="scrollshow"></Board>
      <Board v-scrollshow="scrollshow"></Board>
      <Board v-scrollshow="scrollshow"></Board>
      <Board v-scrollshow="scrollshow"></Board>
    </div>
  </div>
</template>

<script>
import Guest from "./Guest.vue";
import Board from "./Board.vue";
import { messageApi } from "@/api";
export default {
  data() {
    return {
      scrollshow: "bounceInUp",
      boards: [],
    };
  },
  components: {
    Guest,
    Board,
  },
  mounted() {
    this.pageQuery();
  },
  methods: {
    async pageQuery() {
      let result = await messageApi.pageQuery({ page: 1, pageSize: 10 });
      Array.prototype.push.apply(this.boards, result?.datalist || []);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.message-box {
  width: @defaultWidth;
  min-height: 90vh;
  position: relative;
  flex-direction: column;
  margin: 15px auto;
}
.board-box {
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
  // background: #fff;
}

.bounceInUp {
  animation-name: bounceInUp;
  animation-duration: 800ms;
}

.fadeInUpBig {
  animation-name: fadeInUpBig;
  animation-duration: 800ms;
}
</style>