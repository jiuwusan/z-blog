<template>
  <transition
    :enter-active-class="speed + ' fadeIn'"
    :leave-active-class="speed + ' fadeOut'"
  >
    <div
      v-show="visible"
      :style="layStyle"
      :class="['flex', 'popup', 'align-' + align, 'justify-' + justify]"
      @click="stop($event)"
      @touchmove="stop($event)"
    >
      <transition
        :enter-active-class="speed + ' ' + overlayEnterActive"
        :leave-active-class="speed + ' ' + overlayLeaveActive"
      >
        <div
          :style="overlayStyle"
          class="popup-overlay"
          v-show="visible"
          @click="close($event)"
        ></div>
      </transition>
      <transition
        :enter-active-class="speed + ' ' + enterActive"
        :leave-active-class="speed + ' ' + leaveActive"
      >
        <div
          :style="popupStyle"
          class="popup-content"
          v-show="visible"
          @click="stop($event)"
        >
          <slot>
            <!-- 插槽 -->
          </slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      popVisible: false,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false, //['true','false']
    },
    align: {
      type: String,
      default: "bottom", //['top','middle','bottom']
    },
    justify: {
      type: String,
      default: "left", //水平布局=['left','center','right']
    },
    enterActive: {
      type: String,
      default: "fadeInUp", //入场动画
    },
    leaveActive: {
      type: String,
      default: "fadeOutDown", //出场动画
    },
    overlayEnterActive: {
      type: String,
      default: "fadeIn", //蒙层入场动画
    },
    overlayLeaveActive: {
      type: String,
      default: "fadeOut", //蒙层出场动画
    },
    speed: {
      type: String,
      default: "fast", //动画速度，允许的值=['faster','fast','normal','','slow','slower']
    },
    overlayStyle: [String, Object], //蒙层样式
    popupStyle: [String, Object], //内容窗口样式
    layStyle: [String, Object], //窗口容器样式
  },
  watch: {
    visible: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.popVisible = newVal;
          }, 300);
        } else {
          this.popVisible = newVal;
        }
      },
    },
  },
  computed: {},
  methods: {
    close(e) {
      e && e.stopPropagation();
      this.$emit("close", false);
    },
    stop(e) {
      e && e.preventDefault();
      e && e.stopPropagation();
    },
  },
};
</script>

<style scoped>
@import "../css/animate.css";

.flex {
  display: -moz-box;
  /* Firefox */
  display: -ms-flexbox;
  /* IE10 */
  display: -webkit-box;
  /* Safari */
  display: -webkit-flex;
  /* Chrome, WebKit */
  display: flexbox;
  display: flex;
}

.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 997;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.popup > .popup-overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.12);
  flex-direction: column;
  justify-content: flex-end;
}

.popup > .popup-content {
  width: 100%;
  position: relative;
  z-index: 2;
  max-height: 100%;
  overflow-y: auto;
}

.align-top {
  align-items: flex-start;
}

.align-middle {
  align-items: center;
}

.align-bottom {
  align-items: flex-end;
}

.justify-left {
  justify-content: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-right {
  justify-content: flex-end;
}
</style>