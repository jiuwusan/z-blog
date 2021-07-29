<template>
  <div class="item-box flex">
    <div class="flag">置顶</div>
    <div class="header flex">
      <div class="title flex">
        <div class="tag">【原创】</div>
        <div class="txt">Java学习路线推荐</div>
      </div>
      <div class="datetime flex">
        <div class="top">02</div>
        <div class="flex bottom">
          <div class="item">7月</div>
          <div class="item">2021</div>
        </div>
      </div>
    </div>
    <div class="intro flex">
      <Smage class="cover" src="cover01.jpeg"></Smage>
      <div class="content">
        这篇文章是为了介绍自己自学用过的Java视频资料。本套整合教程总共180+G，共450+小时。考虑到绝大部分视频至少要看两遍，而且视频总时长并不代表学习时长，所以零基础初学者总学习时间大约为：600小时视频时长
        + 100小时理解 +
        100小时练习，至少需要800小时。你可能觉得自己能一天学习8小时，实际上平均下来每天能学4小时都算厉害了。总会有各种原因，比如当天内容太难，公司聚会，要出差等等。如果周末你也是坚持学习，那么最理想状况下，6个半月就可以学完，达到工作后能被人带的水平。但我知道那其实基本不可能。
        这篇文章是为了介绍自己自学用过的Java视频资料。本套整合教程总共180+G，共450+小时。考虑到绝大部分视频至少要看两遍，而且视频总时长并不代表学习时长，所以零基础初学者总学习时间大约为：600小时视频时长
        + 100小时理解 +
      </div>
    </div>
    <div class="read flex">
      <div class="more" title="点击阅读全文内容">阅读全文</div>
      <div class="line"></div>
    </div>
    <div class="brief flex">
      <div class="tags-box flex">
        <div class="tag-item flex">
          <Icon name="classify" class="icon"></Icon>
          <div class="cube">Java路线</div>
        </div>
      </div>
      <div class="tags-box flex">
        <div class="tag-item flex" title="阅读量">
          <Icon name="liulan" class="icon"></Icon>
          <div class="txt">99</div>
        </div>
        <div class="tag-item flex" title="评论量">
          <Icon name="pinglun" class="icon"></Icon>
          <div class="txt">19</div>
        </div>
      </div>
    </div>
        <slot></slot>
  </div>
</template>
  
<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.item-box {
  width: 100%;
  position: relative;
  padding: 10px 25px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #fff;
  flex-direction: column;
  .flag {
    position: absolute;
    height: 20px;
    line-height: 20px;
    text-align: center;
    width: 74px;
    background-color: #ff5722;
    color: #fff;
    transform: rotate(-45deg);
    left: -18px;
    top: 9px;
  }
  .header {
    width: 100%;
    align-items: center;
    .title {
      flex-grow: 1;
      align-items: center;
      border-bottom: 1px solid #e8e9e7;
      padding: 5px;
      font-weight: 400;
      vertical-align: bottom;
      line-height: 30px;
      .tag {
        color: #2ea7e0;
        font-size: 16px;
      }
      .txt {
        padding-left: 8px;
        font-size: 18px;
        color: #212220;
      }
    }
    .datetime {
      width: 110px;
      padding: 0px 0px 5px 20px;
      flex-direction: column;
      align-items: center;
      .top {
        text-align: center;
        font-weight: 700;
        font-size: 30px;
        color: #6bc30d;
        position: relative;
      }
      .bottom {
        width: 100%;
        // margin-top: 4px;
        color: #989997;
        font-size: 18px;
        justify-content: space-between;
        align-items: center;
        .item {
          vertical-align: bottom;
        }
      }
    }
  }
  .intro {
    width: 100%;
    .cover {
      min-width: 300px;
      width: 300px;
      max-height: 180px;
      margin-right: 15px;
    }

    .content {
      max-height: 180px;
      flex-grow: 1;
      color: #515250;
      font-size: 14px;
      line-height: 26px;
      text-align: justify;
      .ellipsis(7);
    }
  }
  .read {
    width: 100%;
    padding: 10px 0px;
    align-items: center;
    .more {
      font-weight: bold;
      color: #383937;
      padding-right: 20px;
      position: relative;
      cursor: pointer;
      &:hover {
        color: #6bc30d;
      }
    }
    .line {
      flex-grow: 1;
      content: "";
      height: 0;
      border-bottom: 1px solid #d0d0d0;
    }
  }

  .brief {
    width: 100%;
    justify-content: space-between;
    padding: 5px 0px 12px 0;
    .tags-box {
      align-items: center;
      flex-wrap: wrap;
      .tag-item {
        align-items: center;
        margin-left: 10px;
        cursor: pointer;
        &:first-child {
          margin-left: 0px;
        }
        .icon {
          font-size: 16px;
        }
        .txt {
          color: #787977;
          font-size: 14px;
          margin-left: 8px;
        }
        .cube {
          font-size: 12px;
          padding: 2px 5px;
          background-color: #f1f2f0;
          color: #787977;
          margin-left: 5px;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>