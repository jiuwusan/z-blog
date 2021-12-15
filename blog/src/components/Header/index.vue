<template>
  <div class="header-box" v-show="visible">
    <div class="header-fixed flex">
      <div class="flex header-content">
        <Logo></Logo>
        <div class="btn-box flex">
          <div
            v-for="item in routes"
            :key="item.name"
            :class="['btn-item', currentPath === item.path ? 'checked' : '']"
            @click="goPath(item)"
          >
            {{ item.menuName }}
          </div>
        </div>
      </div>
      <div class="flex header-content-mobile">
        <div class="back flex" @click="goBack">
          <Icon class="icon" name="mobile-back" />
          <span>返回</span>
        </div>
        <div class="title">{{ title }}</div>
        <div class="menu-btn flex">
          <Menu></Menu>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      show: false,
      visible: false,
      currentPath: "/",
      title: "Blog",
    };
  },
  computed: {
    routes() {
      return this.$store.state.menu.list;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (newValue) {
        this.setPath(newValue);
      },
    },
  },
  methods: {
    goPath(route) {
      route?.path && this.$router.push(route?.path);
    },
    setPath(route) {
      this.currentPath = route?.path;
      this.visible = this.currentPath != "" && this.currentPath != "/";
      this.title = route?.meta?.title || "Blog";
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
@media screen and (min-width: 751px) {
  .checked(@color) {
    color: @color;
    &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: @color;
      content: "";
      transition: all 0.6s;
    }
  }
  .header-box {
    width: 100%;
    height: 54px;
    content: "";
    .header-fixed {
      width: 100%;
      position: fixed;
      justify-content: center;
      // padding: 0 5%;
      background: rgba(255, 255, 255, 1);
      z-index: 999;
      .header-content-mobile {
        display: none;
      }
      .header-content {
        width: @defaultWidth;
        align-items: center;
        justify-content: space-between;
        .btn-box {
          height: 54px;
          .btn-item {
            height: 54px;
            line-height: 54px;
            cursor: pointer;
            padding: 4px 28px;
            color: #212220;
            font-weight: 400;
            font-size: 15px;
            text-shadow: 0 1px 0 rgb(255 255 255 / 20%);
            position: relative;
            &:hover {
              .checked(#6bc30d);
            }
            &::before {
              width: 0%;
            }
          }
          .checked {
            .checked(#6bc30d);
          }
        }
      }
    }
  }
}

//宽度0-750px
@media screen and (max-width: 750px) {
  .checked(@color) {
    color: @color;
    &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background: @color;
      content: "";
      transition: all 0.6s;
    }
  }
  .header-box {
    width: 100%;
    height: 54px;
    content: "";
    .header-fixed {
      width: 100%;
      position: fixed;
      justify-content: center;
      // padding: 0 5%;
      background: rgba(255, 255, 255, 1);
      z-index: 999;
      height: 54px;
      border-bottom: 1px solid rgba(244, 244, 244, 1);

      .header-content {
        display: none;
      }
      .header-content-mobile {
        padding: 0px 15px;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        .back {
          font-size: 14px;
          color: #969799;
          align-items: center;
          .icon {
            font-size: 14px;
          }
        }

        .title {
          font-size: #000000;
        }

        .menu-btn {
          .box();
          // border: 1px solid #969799;
          padding: 2px 4px;
          border-radius: 2px;
          .icon {
            font-size: 14px;
          }
        }
      }
    }
  }

  .menu-box {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    .menu-content {
      width: 100%;
      margin-top: 80px;
      flex-direction: column;
      position: relative;
      .menu-item {
        .box();
        padding: 8px 15px;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        font-size: 18px;
        font-weight: 500;
      }
    }
    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 9;
      background: rgba(255, 255, 255, 0.3);
      .icon {
        font-size: 14px;
      }
    }
  }
}
</style>