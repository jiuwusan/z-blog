<template>
  <div class="diary-box" v-if="diarys">
    <div class="diary-content flex">
      <div class="timeline timelineIn"></div>
      <div class="label flex fadeInDown">
        <Icon name="time" class="icon"></Icon>
        <div class="txt">日记</div>
      </div>
      <DiaryItem
        v-for="item in diarys"
        :key="item.uid"
        :data="item"
      ></DiaryItem>
      <div class="label mgt40 flex fadeInUp">
        <Icon name="shalou" class="icon"></Icon>
        <div class="txt">THE END</div>
      </div>
    </div>
  </div>
</template>

<script>
import DiaryItem from "./DiaryItem";
import { diaryApi } from "@/api";
export default {
  data() {
    return {
      diarys: null,
    };
  },
  mounted() {
    this.query();
  },
  components: {
    DiaryItem,
  },
  methods: {
    /**
     * 查询
     */
    async query() {
      let result = await diaryApi.query();
      this.diarys = result;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

@media screen and (min-width: 751px) {
  .relativeTop(@idx) {
    z-index: @idx;
    position: relative;
  }

  .diary-box {
    margin: 15px auto;
    width: @defaultWidth;
    background: #fff;
    padding: 15px;
    min-height: 90vh;
    position: relative;

    .diary-content {
      position: relative;
      width: 100%;
      flex-direction: column;
      .timeline {
        position: absolute;
        left: 25%;
        top: 0;
        height: 100%;
        width: 2px;
        background: #009688;
        z-index: 0;
      }

      .label {
        .relativeTop(1);
        background: #fff;
        width: 100%;
        padding: 10px 10px 10px calc(25% - 17px);
        align-items: center;
        .icon {
          font-size: 36px;
          width: 36px;
        }
        .txt {
          font-size: 34px;
          color: #009688;
          margin-left: 5px;
        }
      }
      .mgt40 {
        margin: 40px 0;
      }
    }
  }

  @keyframes timelineIn {
    from {
      height: 0%;
    }

    to {
      height: 100%;
    }
  }

  .timelineIn {
    animation-name: timelineIn;
    animation-duration: 2s;
  }

  .fadeInUp {
    animation-name: fadeInUp;
    animation-duration: 800ms;
  }

  .fadeInDown {
    animation-name: fadeInDown;
    animation-duration: 800ms;
  }
}

@media screen and (max-width: 750px) {
  .relativeTop(@idx) {
    z-index: @idx;
    position: relative;
  }

  .diary-box {
    margin: 15px auto;
    width: 355px;
    background: #fff;
    padding: 10px;
    min-height: 90vh;
    position: relative;

    .diary-content {
      position: relative;
      width: 100%;
      flex-direction: column;
      .timeline {
        position: absolute;
        left: 20%;
        top: 0;
        height: 100%;
        width: 2px;
        background: #009688;
        z-index: 0;
      }

      .label {
        .relativeTop(1);
        background: #fff;
        width: 100%;
        padding: 10px 10px 10px calc(20% - 17px);
        align-items: center;
        .icon {
          font-size: 36px;
          width: 36px;
        }
        .txt {
          font-size: 34px;
          color: #009688;
          margin-left: 5px;
        }
      }
      .mgt40 {
        margin: 40px 0;
      }
    }
  }

  @keyframes timelineIn {
    from {
      height: 0%;
    }

    to {
      height: 100%;
    }
  }

  .timelineIn {
    animation-name: timelineIn;
    animation-duration: 2s;
  }

  .fadeInUp {
    animation-name: fadeInUp;
    animation-duration: 800ms;
  }

  .fadeInDown {
    animation-name: fadeInDown;
    animation-duration: 800ms;
  }
}


</style>