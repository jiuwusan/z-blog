<template>
  <div class="classify flex slideInRight">
    <div class="search-box">
      <div class="search flex">
        <input placeholder="输入关键字搜索" class="input" />
        <div class="submit flex">
          <Icon name="search" class="icon"></Icon>
        </div>
      </div>
    </div>
    <div class="class-list">
      <div class="class-ul">
        <div class="class-li active">
          <div class="txt">全部文章</div>
        </div>
        <div class="class-li">
          <div class="class-txt">前端</div>
        </div>
        <div class="class-li">
          <div class="class-txt">Java</div>
        </div>
        <div class="class-li">
          <div class="class-txt">JavaScript</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.checked() {
  background: #f8f9f7;
  &::after {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    height: 100%;
    border-right: 4px solid #484947;
  }
}

.classify {
  width: 100%;
  position: relative;
  background-color: #fff;
  flex-direction: column;
  .search-box {
    width: 100%;
    padding: 20px;
    background-color: grey;
    .search {
      height: 40px;
      padding: 0 20px;
      background-color: #fff;
      border-radius: 40px;
      position: relative;
      z-index: 5;
      .input {
        height: 40px;
        line-height: 40px;
        flex-grow: 1;
        box-shadow: none;
        background-color: transparent;
        color: #515250;
        outline: 0;
        margin: 0;
        padding: 0;
        border: 0;
      }
      .submit {
        white-space: nowrap;
        word-break: break-all;
        padding: 6px;
        .icon {
          font-size: 18px;
        }
      }
    }
  }

  .class-list {
    width: 100%;
    background: #fff;
    padding: 20px 0;
    .class-ul {
      width: 100%;
      .active {
        .checked();
      }
      .class-li {
        width: 100%;
        margin: 0;
        padding: 0 20px;
        color: #515250;
        line-height: 40px;
        height: 40px;
        cursor: pointer;
        position: relative;
        &:hover {
          .checked();
        }
        .class-txt {
          width: 100%;
          border-bottom: 1px solid #f8f9f7;
        }
      }
    }
  }
}

.slideInRight {
  animation-name: slideInRight;
  animation-duration: 500ms;
}
</style>