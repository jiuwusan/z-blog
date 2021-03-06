<template>
  <div class="item flex" v-if="fttData">
    <div v-show="yearVisibile" class="year flex fadeInLeft">
      <div class="txt">{{ fttData.year }}</div>
      <Icon name="packup" class="icon" />
    </div>
    <div class="content flex">
      <div class="left fadeInLeft">{{ fttData.month }}</div>
      <div class="timestamp flex">
        <div class="icon zoomIn"></div>
      </div>
      <div class="right fadeInRight">
        <div>{{ fttData.overview }}</div>
        <div class="imageBox" v-if="fttData.imageArray.length > 0">
          <Smage
            prefix
            :src="item"
            class="imageItem"
            v-for="item in fttData.imageArray"
            preview
            :key="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { util } from "@jws";
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      fttData: null,
      yearVisibile: false,
    };
  },
  watch: {
    data: {
      immediate: true,
      handler: function (newValue) {
        this.setFttData(newValue);
      },
    },
  },
  mounted() {},
  methods: {
    /**
     * 对data进行数据处理
     */
    setFttData(data) {
      data && (data = JSON.parse(JSON.stringify(data)));
      data.year = util.formatTime(data.datetime, "yyyy年");
      data.month = util.formatTime(data.datetime, "MM月dd日");
      data.imageArray = [];
      data.image && (data.imageArray = data.image.split(","));
      this.fttData = data;
      //设置年份是否显示
      let yearTimeout = setTimeout(() => {
        this.setYearShow();
        clearTimeout(yearTimeout);
      }, 200);
    },
    setYearShow() {
      let preYear =
        this.$el.previousSibling?.firstChild?.firstChild.textContent;
      this.yearVisibile = preYear !== this.fttData.year;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

@media screen and (min-width: 751px) {
  .item {
    z-index: 1;
    position: relative;
    width: 100%;
    padding: 10px 0;
    flex-direction: column;
    .year {
      width: 25%;
      position: relative;
      color: #6bc30d;
      font-size: 30px;
      align-items: center;
      justify-content: flex-end;
      padding-right: 30px;
      margin-bottom: 15px;
      .icon {
        margin: 0 5px;
        width: 20px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .content {
      width: 100%;
      .left {
        width: calc(25% - 22px);
        min-width: calc(25% - 22px);
        padding-right: 15px;
        color: #484348;
        font-size: 18px;
        height: 33px;
        line-height: 33px;
        text-align: right;
      }
      .timestamp {
        width: 46px;
        height: 33px;
        align-items: center;
        justify-content: center;
        background: #fff;
        .icon {
          content: "";
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 3px solid #009688;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            background-color: #009688;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            width: 5px;
            height: 5px;
            border-radius: 50%;
          }
        }
      }
      .right {
        border-radius: 3px;
        max-width: 68%;
        padding: 10px;
        margin-left: 10px;
        background: #009688;
        color: #fff;
        position: relative;
        margin-top: 3px;
        font-size: 14px;
        line-height: 1.4;
        transition: width 5s;
        -moz-transition: width 5s; /* Firefox 4 */
        -webkit-transition: width 5s; /* Safari 和 Chrome */
        -o-transition: width 5s;
        &::before {
          position: absolute;
          left: -20px;
          top: 6px;
          height: 0;
          width: 0;
          content: "";
          border: 10px solid rgba(255, 255, 255, 0);
          border-top: 6px solid rgba(255, 255, 255, 0);
          border-bottom: 6px solid rgba(255, 255, 255, 0);
          border-right-color: #009688;
        }

        .imageBox {
          margin: 10px 0 0 -8px;
          .imageItem {
            width: 60px;
            height: 60px;
            margin: 0 0 0 8px;
            border-radius: 5px;
          }
        }
      }
    }
  }

  .fadeInRight {
    animation-name: fadeInRight;
    animation-duration: 800ms;
  }

  .fadeInLeft {
    animation-name: fadeInLeft;
    animation-duration: 800ms;
  }

  .zoomIn {
    animation-name: zoomIn;
    animation-duration: 800ms;
  }
}

@media screen and (max-width: 750px) {
  .item {
    z-index: 1;
    position: relative;
    width: 100%;
    padding: 10px 0;
    flex-direction: column;
    .year {
      width: 20%;
      position: relative;
      color: #6bc30d;
      font-size: 17px;
      flex-direction: column;
      padding: 0 5px 15px 0;
      box-sizing: border-box;
      align-items: flex-end;

      .txt {
        white-space: nowrap;
      }

      .icon {
        margin: 0 5px;
        width: 20px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .content {
      width: 100%;
      .left {
        width: calc(20% - 9px);
        min-width: calc(20% - 9px);
        padding-right: 5px;
        color: #484348;
        font-size: 12px;
        height: 33px;
        line-height: 33px;
        text-align: right;
      }
      .timestamp {
        width: 20px;
        height: 33px;
        align-items: center;
        justify-content: center;
        background: #fff;
        .icon {
          content: "";
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 3px solid #009688;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            background-color: #009688;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            width: 5px;
            height: 5px;
            border-radius: 50%;
          }
        }
      }
      .right {
        border-radius: 3px;
        max-width: 73%;
        padding: 8px;
        margin-left: 10px;
        background: #009688;
        color: #fff;
        position: relative;
        margin-top: 5px;
        font-size: 14px;
        line-height: 1.4;
        transition: width 5s;
        -moz-transition: width 5s; /* Firefox 4 */
        -webkit-transition: width 5s; /* Safari 和 Chrome */
        -o-transition: width 5s;
        &::before {
          position: absolute;
          left: -20px;
          top: 6px;
          height: 0;
          width: 0;
          content: "";
          border: 10px solid rgba(255, 255, 255, 0);
          border-top: 6px solid rgba(255, 255, 255, 0);
          border-bottom: 6px solid rgba(255, 255, 255, 0);
          border-right-color: #009688;
        }

        .imageBox {
          margin: 10px 0 0 -8px;
          .imageItem {
            width: 60px;
            height: 60px;
            margin: 0 0 0 8px;
            border-radius: 5px;
          }
        }
      }
    }
  }

  .fadeInRight {
    animation-name: fadeInRight;
    animation-duration: 800ms;
  }

  .fadeInLeft {
    animation-name: fadeInLeft;
    animation-duration: 800ms;
  }

  .zoomIn {
    animation-name: zoomIn;
    animation-duration: 800ms;
  }
}
</style>