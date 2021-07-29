<template>
  <div class="footer flex">
    <div class="footer-item flex">
      <div class="title">ZY个人博客</div>
      <div class="definite flex">
        <Icon class="icon" name="go"></Icon>
        <div class="txt">不放弃！绝不放弃！永不放弃！</div>
      </div>
    </div>
    <div class="footer-item flex">
      <div class="title">相关链接</div>
      <div class="definite flex">
        <Icon class="icon" name="gitee"></Icon>
        <div class="txt">https://gitee.com/jiuwusan</div>
      </div>
    </div>
    <div class="footer-item flex">
      <div class="title">联系我</div>
      <div class="definite flex">
        <Icon class="icon" name="mail"></Icon>
        <div class="txt">ZhouKaiDong953@qq.com</div>
      </div>
      <div class="definite flex">
        <Icon class="icon" name="qq"></Icon>
        <div class="txt">953343906</div>
      </div>
      <div class="definite flex">
        <Icon class="icon" name="wechat"></Icon>
        <div class="txt">ZkDHzR</div>
      </div>
    </div>
  </div>
  <div class="copyright">Copyright © 2020-2021 Zy-Blog</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.footer {
  width: 100%;
  background: #232328;
  padding: 60px 90px;
  color: #fff;
  // margin-top: 20px;
  .footer-item {
    flex-direction: column;
    flex-grow: 1;
    padding-left: 40px;
    .title {
      font-size: 18px;
      white-space: nowrap;
      margin-bottom: 20px;
    }
    .definite {
      color: #eee;
      font-size: 14px;
      margin-bottom: 10px;
      padding-left: 10px;
      align-items: center;
      .icon {
        font-size: 16px;
      }
      .txt {
        padding-left: 5px;
      }
    }
  }
}

.copyright {
  padding: 15px;
  background: #1d1d21;
  text-align: center;
  color: #bbb;
  font-size: 14px;
}
</style>