<template>
  <div class="right-fill"></div>
  <div class="right-box flex" :style="rightStyle" ref="rightBox">
    <slot></slot>
    <div v-if="back" class="slideInRight backpage mgt20" @click="goBack">
      <Icon class="icon" name="backpage"></Icon>
      <div class="text">返回列表</div>
    </div>
  </div>
</template>

<script>
import { util } from "@jws";
export default {
  props: {
    back: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rightStyle: "top:0px;",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    handleScroll: util.debounce(function () {
      let parentHeight = this.$refs.rightBox.parentNode.offsetHeight;
      let curHeight = this.$refs.rightBox.offsetHeight;
      //获取滚动时的高度
      let scrollTop = document.body.scrollTop
        ? document.body.scrollTop
        : document.documentElement.scrollTop;
      if (scrollTop + curHeight > parentHeight) {
        scrollTop = parentHeight - curHeight;
      }

      this.rightStyle = `top:${scrollTop}px;`;
    }, 150),
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.mgt20 {
  margin-top: 20px;
}

.right-fill {
  width: 280px;
  content: "";
}

.right-box {
  right: 0px;
  flex-direction: column;
  width: 260px;
  position: absolute;
  top: 0;
  z-index: 1;
  transition: top 0.6s;
  -moz-transition: top 0.6s; /* Firefox 4 */
  -webkit-transition: top 0.6s; /* Safari 和 Chrome */
  -o-transition: top 0.6s; /* Opera */
  .backpage {
    .flex();
    align-items: center;
    border-radius: 8px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    .icon {
      font-size: 26px;
    }
    .text {
      font-size: 22px;
      margin-left: 10px;
      color: #787977;
      &:hover {
        color: #52c01a;
      }
    }
  }
}

.slideInRight {
  animation-name: fadeInUpBig;
  animation-duration: 500ms;
}
</style>