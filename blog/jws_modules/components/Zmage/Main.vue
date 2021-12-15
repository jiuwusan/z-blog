<template>
  <div @click="close" class="zmage-box">
    <!-- <img v-for="item in items" :key="item.id" :src="item" alt=""> -->
    <transition name="zoom" @after-leave="$emit('destroy')">
      <img
        v-show="visible"
        @click="stop($event)"
        class="image-item"
        :src="path"
        alt=""
      />
    </transition>
    <img class="close" :src="closeIcon" alt="关闭" @click="close" />
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: [String, Array],
    },
  },
  data() {
    return {
      closeIcon: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI5MTg5NjAwNDMyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwODAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzc2IDI0OGMtNzMtNzMtMTY4LjgtMTA5LjYtMjY0LjUtMTA5LjYtOTUuOCAwLTE5MS41IDM2LjYtMjY0LjYgMTA5LjYtMTQ2LjEgMTQ2LjEtMTQ2LjEgMzgyLjkgMCA1MjkgNzMgNzMgMTY4LjggMTA5LjYgMjY0LjUgMTA5LjZTNzAyLjkgODUwLjEgNzc2IDc3N2MxNDYtMTQ2LjEgMTQ2LTM4Mi45IDAtNTI5eiBtLTQ1LjQgNDgzLjdjLTU4LjYgNTguNi0xMzYuNCA5MC44LTIxOS4yIDkwLjhzLTE2MC43LTMyLjItMjE5LjItOTAuOGMtMTIwLjktMTIwLjktMTIwLjktMzE3LjUgMC00MzguNCA1OC42LTU4LjYgMTM2LjQtOTAuOCAyMTkuMi05MC44czE2MC43IDMyLjIgMjE5LjIgOTAuOGM1OC42IDU4LjYgOTAuOCAxMzYuNCA5MC44IDIxOS4yIDAgODIuOC0zMi4yIDE2MC43LTkwLjggMjE5LjJ6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSIyMDgxIj48L3BhdGg+PHBhdGggZD0iTTYyNS43IDM1M0w1MTEuNCA0NjcuMiAzOTcuMiAzNTNsLTQ1LjMgNDUuMiAxMTQuMiAxMTQuMy0xMTQuMiAxMTQuMyA0NS4zIDQ1LjMgMTE0LjItMTE0LjMgMTE0LjMgMTE0LjMgNDUuMy00NS4zLTExNC4zLTExNC4zTDY3MSAzOTguMnoiIGZpbGw9IiNmZmZmZmYiIHAtaWQ9IjIwODIiPjwvcGF0aD48L3N2Zz4=`,
      visible: false,
    };
  },
  mounted() {
    this.visible = true;
  },
  methods: {
    close() {
      this.visible = false;
    },
    stop(e) {
      e && e.preventDefault();
      e && e.stopPropagation();
    },
  },
};
</script>

<style lang="less" scoped>
.flex() {
  display: -moz-box;
  /* Firefox */
  display: -ms-flexbox;
  /* IE10 */
  display: -webkit-box;
  /* Safari */
  display: -webkit-flex;
  /* Chrome, WebKit */
  /* display: box; */
  display: flexbox;
  display: flex;
}

@media screen and (min-width: 751px) {
  .zmage-box {
    position: fixed;
    z-index: 99999999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    .flex();
    align-items: center;
    justify-content: center;
    .image-item {
      // width: 80%;
      max-height: 80%;
    }
    .close {
      position: absolute;
      z-index: 9;
      width: 50px;
      height: 50px;
      top: calc(10% - 70px);
      right: calc(10% - 70px);
      cursor: pointer;
    }
  }

  @keyframes ZoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes ZoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      opacity: 0;
    }
  }

  .zoom-enter-active {
    animation: ZoomIn 0.5s;
  }

  .zoom-leave-active {
    animation: ZoomOut 0.5s;
  }
}

@media screen and (max-width: 750px) {
  .zmage-box {
    position: fixed;
    z-index: 99999999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    .flex();
    align-items: center;
    justify-content: center;
    .image-item {
      // width: 80%;
      max-height: 80%;
    }
    .close {
      position: absolute;
      z-index: 9;
      width: 50px;
      height: 50px;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }

  @keyframes ZoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes ZoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      opacity: 0;
    }
  }

  .zoom-enter-active {
    animation: ZoomIn 0.5s;
  }

  .zoom-leave-active {
    animation: ZoomOut 0.5s;
  }
}
</style>