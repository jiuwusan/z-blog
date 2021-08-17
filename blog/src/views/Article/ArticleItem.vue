<template>
  <div class="item-box flex">
    <div class="flag" v-show="fttData.top === '10'">置顶</div>
    <div class="header flex">
      <div class="title flex">
        <div class="tag">【{{ fttData.type_ftt }}】</div>
        <div class="txt">{{ fttData.title }}</div>
      </div>
      <div class="datetime flex">
        <div class="top">{{ fttData.day }}</div>
        <div class="flex bottom">
          <div class="item">{{ fttData.month }}月</div>
          <div class="item">{{ fttData.year }}</div>
        </div>
      </div>
    </div>
    <div class="intro flex">
      <Smage preview prefix class="cover" :src="fttData.cover"></Smage>
      <div class="content">{{ fttData.simpleText }}</div>
    </div>
    <div class="read flex">
      <div class="more" title="点击阅读全文内容" @click="goDetail">
        阅读全文
      </div>
      <div class="line"></div>
    </div>
    <div class="brief flex">
      <div class="tags-box flex">
        <div class="tag-item flex">
          <Icon name="classify" class="icon"></Icon>
          <div class="cube" v-for="item in fttData.classArray" :key="item.uid">
            {{ item.name }}
          </div>
        </div>
        <div class="tag-item flex">
          <Icon name="label" class="icon"></Icon>
          <div class="cube" v-for="item in fttData.labelArray" :key="item.uid">
            {{ item.name }}
          </div>
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
const typeMap = {
  10: "原创",
  20: "转载",
};

export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      fttData: {
        classArray: [],
        labelArray: [],
      },
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          newValue.classArray = JSON.parse(newValue.classStr);
          newValue.labelArray = JSON.parse(newValue.labelStr);
          newValue.year = newValue.created_at_ftt.substring(0, 4);
          newValue.month = newValue.created_at_ftt.substring(5, 7);
          newValue.day = newValue.created_at_ftt.substring(8, 10);
          newValue.type_ftt = typeMap[newValue.type];
          newValue.simpleText = this.getSimpleText(newValue.content);
        }
        this.fttData = newValue;
      },
    },
  },
  methods: {
    getSimpleText(html) {
      var re1 = new RegExp("<.+?>", "g"); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
      var msg = html.replace(re1, ""); //执行替换成空字符
      return msg;
    },
    goDetail() {
      this.$router.push(`/article/detail/${this.fttData.uid}`);
    },
  },
};
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
      // white-space: pre-line;
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