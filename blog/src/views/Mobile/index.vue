<template>
  <div class="mobile-box">
    <div class="develep">
      <Smage prefix class="icon" src="/icon/gen/develeping.svg" alt="" />
      <div class="warning">移动端正在开发中...</div>
      <div class="warning red">请使用电脑访问</div>
      <div class="warning">敬请期待</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.mobile-box {
  width: 100vw;
  height: 100vh;
  .flex();
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999999999999999999999999999999;
  .develep {
    .flex();
    flex-direction: column;
    align-items: center;
    .icon {
      width: 50px;
    }
    .warning {
      margin-top: 10px;
      color: #d1cfcf;
      font-size: 16px;
    }

    .red{
        color: #d81e06;
        opacity: .8;
    }
  }
}
</style>