<template>
  <div class="board-item flex" v-if="data">
    <BoardChild :data="data"></BoardChild>
    <div class="repeat-box" v-if="data.replys.length > 0">
      <BoardChild
        v-for="item in data.replys"
        :key="item.uid"
        :data="item"
      ></BoardChild>
    </div>
  </div>
</template>

<script>
import BoardChild from "./BoardChild.vue";
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  components: {
    BoardChild,
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

@media screen and (min-width: 751px) {
  .board-item {
    width: 100%;
    padding: 15px;
    border-bottom: 1px dotted #515250;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.8);
    &:last-child {
      border-bottom: 0px dotted #515250;
    }
    .repeat-box {
      border-top: 0.5px solid rgba(81, 82, 80, 0.2);
      margin: 10px 0px 0px 50px;
      padding: 10px;
    }
  }
}

@media screen and (max-width: 750px) {
  .board-item {
    width: 100%;
    padding: 15px;
    border-bottom: 1px dotted #515250;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.8);
    &:last-child {
      border-bottom: 0px dotted #515250;
    }
    .repeat-box {
      border-top: 0.5px solid rgba(81, 82, 80, 0.2);
      margin: 10px 0px 0px 20px;
      padding: 10px;
    }
  }
}
</style>