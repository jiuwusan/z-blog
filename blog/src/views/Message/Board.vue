<template>
  <div class="board-item  flex">
    <BoardChild></BoardChild>
    <div class="repeat-box">
      <BoardChild></BoardChild>
      <BoardChild></BoardChild>
    </div>
  </div>
</template>

<script>
import BoardChild from "./BoardChild.vue";
export default {
  components: {
    BoardChild,
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.board-item {
  width: 100%;
  padding: 15px;
  border-bottom: 1px dotted #515250;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.6);
  &:last-child {
    border-bottom: 0px dotted #515250;
  }
  .repeat-box {
    border-top: 0.5px solid rgba(81, 82, 80, 0.2);
    margin: 10px 0px 0px 50px;
    padding: 10px;
  }
}
</style>