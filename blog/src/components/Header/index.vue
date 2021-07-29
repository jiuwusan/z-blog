<template>
  <div class="header-box" v-show="visible">
    <div class="header-fixed flex">
      <div class="header-content flex">
        <Logo></Logo>
        <div class="btn-box flex">
          <div
            v-for="item in routes"
            :key="item.name"
            :class="['btn-item', currentPath === item.path ? 'checked' : '']"
            @click="goPath(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      currentPath: "/",
      routes: [
        {
          name: "首页",
          path: "/",
        },
        {
          name: "博客",
          path: "/article",
        },
        {
          name: "留言",
          path: "/message",
        },
        {
          name: "日记",
          path: "/diary",
        },
        {
          name: "友链",
          path: "/link",
        },
      ],
    };
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
    setPath(route) {
      this.currentPath = route?.path;
      this.visible = this.currentPath != "" && this.currentPath != "/";
    },
    goPath(route) {
      route?.path && this.$router.push(route?.path);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
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
</style>