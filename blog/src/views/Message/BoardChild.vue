<template>
  <div class="boardchild-box flex">
    <Smage prefix class="avtor"  :src="data.avatar" alt="" />
    <div class="matter flex">
      <div class="nickname">
        {{ data?.nickname }}
        <span class="repeat" v-show="data?.pid">回复</span>
        <!-- 游客666666666 -->
      </div>
      <div class="content" v-html="data?.content"></div>
      <div class="datetime flex">
        <Icon name="time02" class="icon"></Icon>
        <div class="time">{{ data.created_at_ftt }}</div>
        <!-- <div class="repeat">回复</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.boardchild-box {
  width: 100%;
  margin-top: 10px;
  .avtor {
    min-width: 45px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    // margin-top: 10px;
    // border: 1px solid rgba(81, 82, 80,0.5);
  }
  .matter {
    flex-grow: 1;
    padding-left: 15px;
    flex-direction: column;
    .nickname {
      font-size: 16px;
      color: #01aaed;
      padding: 5px 0px;
      .repeat {
        font-size: 12px;
        padding: 0px 4px;
        color: #515250;
      }
    }
    .content {
      margin: 2px 0px 5px 0;
      text-align: justify;
      // max-width: 80%;
    }
    .datetime {
      align-items: center;
      .icon {
        font-size: 13px;
      }
      .time {
        font-size: 12px;
        line-height: 20px;
        margin: 0px 5px;
      }
      .repeat {
        color: #009688;
        font-size: 12px;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>