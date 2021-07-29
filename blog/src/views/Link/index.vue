<template>
  <div class="link-box flex">
    <Smage src="saodi.png" class="saodi"></Smage>
    <div class="content-box">
      <div class="content">
        <div class="title">链接申请说明</div>
        <div class="askfor flex">
          <div class="item flex">
            <Icon name="cuo" class="icon"></Icon>
            <div class="txt">经常宕机</div>
          </div>
          <div class="item flex">
            <Icon name="cuo" class="icon"></Icon>
            <div class="txt">不合法规</div>
          </div>
          <div class="item flex">
            <Icon name="cuo" class="icon"></Icon>
            <div class="txt">插边球站</div>
          </div>
          <div class="item flex">
            <Icon name="cuo" class="icon"></Icon>
            <div class="txt">红标报毒</div>
          </div>
          <div class="item flex">
            <Icon name="dui" class="icon"></Icon>
            <div class="txt">原创优先</div>
          </div>
          <div class="item flex">
            <Icon name="dui" class="icon"></Icon>
            <div class="txt">技术优先</div>
          </div>
        </div>
        <div class="askcont">
          <div class="row">如需交换友链，可以在留言区留言</div>
          <div class="row">名称：ZY个人博客</div>
          <div class="row">网址：http://jiuwusan.cn/</div>
          <div class="row">图标：http://jiuwusan.cn/logo.png</div>
          <div class="row">
            描述：故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身
          </div>
        </div>
        <div class="warning">
          申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)
        </div>
      </div>
      <div class="link-list flex">
        <div class="link-item flex">
          <div class="row flex">
            <Smage src="cover01.jpeg" class="logo"></Smage>
            <div class="name">ZY个人博客</div>
          </div>
          <div class="row">故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身。</div>
        </div>
        <div class="link-item flex">
          <div class="row flex">
            <Smage src="cover01.jpeg" class="logo"></Smage>
            <div class="name">ZY个人博客</div>
          </div>
          <div class="row">故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身。</div>
        </div>
        <div class="link-item flex">
          <div class="row flex">
            <Smage src="cover01.jpeg" class="logo"></Smage>
            <div class="name">ZY个人博客</div>
          </div>
          <div class="row">故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/global.less";

.link-box {
  width: @defaultWidth;
  // min-height: 90vh;
  position: relative;
  margin: 25px auto 15px auto;
  .saodi {
    width: 200px;
    height: 375px;
  }
  .content-box {
    flex-grow: 1;
    .content {
      width: 100%;
      background: #fff;
      padding: 15px;
      .title {
        margin-bottom: 25px;
        padding-left: 14px;
        border-left: 4px solid #6bc30d;
        font-weight: 700;
        font-size: 20px;
        line-height: 20px;
      }
      .askfor {
        color: #515250;
        font-size: 14px;
        flex-wrap: wrap;
        padding-left: 16px;
        .item {
          margin-right: 8px;
          align-items: center;
          font-size: 16px;
          .icon {
            font-size: 11px;
          }
          .txt {
            margin-left: 4px;
          }
        }
      }
      .askcont {
        padding-left: 16px;
        color: #515250;
        font-size: 14px;
        margin: 20px 0;
        .row {
          margin-top: 4px;
        }
      }
      .warning {
        padding-left: 16px;
        color: #515250;
        font-size: 14px;
      }
    }

    .link-list {
      margin-top: 20px;
      flex-wrap: wrap;
      .link-item {
        width: 258px;
        padding: 15px;
        margin: 15px 15px 0 0px;
        flex-direction: column;
        background: #fff;
        cursor: pointer;
        &:nth-child(4n){
          margin: 15px 0px 0 0px;
        }
        .row {
          margin-top: 14px;
          color: #333;
          font-size: 13px;
          align-items: center;
          &:first-child {
            margin-top: 0px;
          }
          .logo {
            width: 40px;
            height: 40px;
            border-radius: 100%;
          }
          .name {
            color: #333;
            font-size: 17px;
            padding-left: 8px;
          }
        }
      }
    }
  }
}
</style>