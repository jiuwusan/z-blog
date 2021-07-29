<template>
  <div class="boardchild-box flex">
    <Smage class="avtor" src="avtor01.jpeg" alt="" />
    <div class="matter flex">
      <div class="nickname">
        游客16355356133
        <span class="repeat">回复</span>
        游客666666666
      </div>
      <div class="content">
        哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或
      </div>
      <div class="datetime flex">
        <Icon name="time02" class="icon"></Icon>
        <div class="time">2021-07-12 14:32:36</div>
        <div class="repeat">回复</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.boardchild-box {
  width: 100%;
  margin-top: 10px;
  .avtor {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 10px;
    // border: 1px solid rgba(81, 82, 80,0.5);
  }
  .matter {
    flex-grow: 1;
    padding-left: 5px;
    flex-direction: column;
    .nickname {
      font-size: 14px;
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
      width: 100%;
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