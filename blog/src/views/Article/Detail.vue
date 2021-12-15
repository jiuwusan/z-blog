<template>
  <div class="article-detail-box flex">
    <div class="content-box">
      <div class="header">
        <div class="title">{{ detailData.title }}</div>
        <div class="info">
          <div class="time">发布时间：{{ detailData.created_at_ftt }}</div>
          <div class="count">阅读量：{{ detailData.readCount }}</div>
        </div>
      </div>
      <div class="content">
        <RichText :content="detailData.content"></RichText>
      </div>
    </div>
    <RightBox :back="true">
      <Classify></Classify>
      <Label class="mgt20"></Label>
      <Rank class="mgt20"></Rank>
    </RightBox>
  </div>
</template>

<script>
import Classify from "./Classify";
import Rank from "./Rank";
import RightBox from "./RightBox";
import { articleApi } from "@/api";
import { RichText } from "@jws/components";
import Label from "./Label";
export default {
  data() {
    return {
      detailData: {},
    };
  },
  components: {
    Classify,
    RichText,
    Rank,
    RightBox,
    Label,
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue) {
        if ((newValue?.path || "").indexOf("/article/detail") > -1) {
          this.findById();
        }
      },
    },
  },
  mounted() {
    this.$store.dispatch("archives/init");
  },
  methods: {
    async findById() {
      let { uid } = this.$route.params || {};
      let result = await articleApi.findById({ uid });
      this.detailData = result;
      if (result?.title) {
        document.title = result.title;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

@media screen and (min-width: 751px) {
  .mgt20 {
    margin-top: 20px;
  }

  .article-detail-box {
    min-height: 90vh;
    margin: 20px auto 60px auto;
    justify-content: center;
    // padding: 0px 0px 40px 0px;
    position: relative;
    .content-box {
      background-color: #fff;
      width: calc(21cm + 2px);
      .header {
        padding: 20px 1.2cm 10px 1.2cm;
        .title {
          font-weight: 600;
          vertical-align: bottom;
          line-height: 30px;
          font-size: 22px;
        }
        .info {
          .flex();
          align-items: center;
          margin: 15px 0 0 0;
          .time {
            font-size: 14px;
            color: #999aaa;
          }

          .count {
            margin-left: 10px;
            .icon {
              font-size: 14px;
            }
            font-size: 14px;
            color: #999aaa;
          }
        }
      }
      .content {
        width: 100%;
        padding: 0 1.2cm 1.2cm 1cm;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .mgt20 {
    margin-top: 20px;
  }

  .article-detail-box {
    .box();
    width: calc(100vw - 15px);
    min-height: 90vh;
    margin: 20px auto 40px auto;
    justify-content: center;
    // padding: 0px 0px 40px 0px;
    position: relative;
    overflow-x: auto;
    .content-box {
      background-color: #fff;
      width: 100%;
      padding: 15px 10px;
      .header {
        .title {
          font-weight: 600;
          vertical-align: bottom;
          line-height: 24px;
          font-size: 18px;
          text-align: justify
        }
        .info {
          .flex();
          align-items: center;
          margin: 15px 0 0 0;
          .time {
            font-size: 14px;
            color: #999aaa;
          }

          .count {
            margin-left: 10px;
            .icon {
              font-size: 14px;
            }
            font-size: 14px;
            color: #999aaa;
          }
        }
      }
      .content {
        width: 100%;
        font-size: 12px;
      }
    }
  }
}

.rotateInDownLeft {
  animation-name: rotateInUpLeft;
  animation-duration: 500ms;
}

.slideInRight {
  animation-name: fadeInUpBig;
  animation-duration: 500ms;
}
</style>