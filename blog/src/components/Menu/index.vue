<template>
  <div>
    <div class="hover menu-box pointer active flex" @click="stop">
      <div class="btn-box flex" @click="visibleChange">
        <Icon v-if="!visible" name="menu"></Icon>
        <Icon v-if="visible" name="close"></Icon>
      </div>
    </div>
    <transition name="fade">
      <div v-show="visible" class="overlay-box">
        <transition name="fadeRight">
          <div v-show="visible" class="echelon-box flex" @click="visibleChange">
            <div class="echelon" @click="stop"></div>
            <div class="menu-list flex" @click="stop">
              <div class="menu-item" @click="goMenu('')">首页</div>
              <div class="menu-item" @click="goMenu('article')">博客</div>
              <div class="menu-item" @click="goMenu('message')">留言</div>
            </div>
            <div class="logo" @click="stop">
              <logo></logo>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    visibleChange() {
      this.visible = !this.visible;
    },
    stop(e) {
      e && e.preventDefault();
      e && e.stopPropagation();
    },
    goMenu(pathname) {
      this.$router.push(pathname);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.hover:hover {
  background: #6bc30d;
}

.menu-box {
  z-index: 999;
  position: fixed;
  top: 30px;
  right: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  padding: 8px;
  .btn-box {
    width: 30px;
    height: 30px;
    font-size: 30px;
  }
}

.overlay-box {
  z-index: 900;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  .echelon-box {
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    .menu-list {
      z-index: 99;
      position: relative;
      flex-direction: column;
      .menu-item {
        font-size: 20px;
        color: #686967;
        padding: 20px 50px;
        cursor: pointer;
      }
    }

    .echelon {
      position: absolute;
      z-index: 9;
      right: 0;
      height: 100%;
      width: 60%;
      transform: translateZ(0) translateX(45%) skew(-12deg);
      backface-visibility: hidden;
      background: rgba(255, 255, 255, 1);
    }
    .logo {
      position: absolute;
      z-index: 88;
      z-index: 9;
      right: 0;
      bottom: 0;
      padding: 20px 50px;
    }
  }
}

.fade-leave-active {
  animation-name: fadeOut;
  animation-delay: calc(1s / 3);
  animation-duration: calc(1s / 2);
}

.fade-enter-active {
  animation-name: fadeIn;
  animation-duration: calc(1s / 2);
}

.fadeRight-leave-active {
  animation-name: fadeOutRight;
  animation-duration: calc(1s / 2);
}

.fadeRight-enter-active {
  animation-name: fadeInRight;
  animation-duration: calc(1s / 2);
}
</style>