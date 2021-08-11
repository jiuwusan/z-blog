<template>
  <div class="notification">
    <div class="notice-item" v-for="item in notices" :key="item.id">
      <img class="icon" :src="iconMap[item.type]" />
      <div class="content">
        <div class="title">{{ item.title }}</div>
        <div class="massage">{{ item.massage }}</div>
      </div>
    </div>
  </div>
</template>
<script>
// 全局弹窗
export default {
  setup() {},
  data() {
    return {
      iconMap: {
        success: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI4Njc1OTcyODQ2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUzMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTExLjYgMTQ4LjJjNDkuNyAwIDk3LjkgOS43IDE0My4yIDI4LjkgNDMuOCAxOC41IDgzLjIgNDUuMSAxMTcgNzguOSAzMy44IDMzLjggNjAuNCA3My4yIDc4LjkgMTE3IDE5LjIgNDUuMyAyOC45IDkzLjUgMjguOSAxNDMuMnMtOS43IDk3LjktMjguOSAxNDMuMmMtMTguNSA0My44LTQ1LjEgODMuMi03OC45IDExNy0zMy44IDMzLjgtNzMuMiA2MC40LTExNyA3OC45LTQ1LjMgMTkuMi05My41IDI4LjktMTQzLjIgMjguOXMtOTcuOS05LjctMTQzLjItMjguOWMtNDMuOC0xOC41LTgzLjItNDUuMS0xMTctNzguOS0zMy44LTMzLjgtNjAuNC03My4yLTc4LjktMTE3LTE5LjItNDUuMy0yOC45LTkzLjUtMjguOS0xNDMuMnM5LjctOTcuOSAyOC45LTE0My4yYzE4LjUtNDMuOCA0NS4xLTgzLjIgNzguOS0xMTcgMzMuOC0zMy44IDczLjItNjAuNCAxMTctNzguOSA0NS4zLTE5LjIgOTMuNS0yOC45IDE0My4yLTI4LjltMC04MGMtMjQ3LjQgMC00NDggMjAwLjYtNDQ4IDQ0OHMyMDAuNiA0NDggNDQ4IDQ0OCA0NDgtMjAwLjYgNDQ4LTQ0OC0yMDAuNi00NDgtNDQ4LTQ0OHoiIGZpbGw9IiM1MkMwMUEiIHAtaWQ9IjUzMTciPjwvcGF0aD48cGF0aCBkPSJNMzk5LjkgNjYxLjVMMjg4LjggNTQxLjhjLTE1LTE2LjItMTQuMS00MS41IDIuMS01Ni41czQxLjUtMTQuMSA1Ni41IDIuMWw1OC45IDYzLjRjMTQuNiAxNS43IDM5IDE3LjEgNTUuMyAzLjJsMjE3LjUtMTg2LjJjMTYuOC0xNC40IDQyLTEyLjQgNTYuNCA0LjQgMTQuNCAxNi44IDEyLjQgNDItNC40IDU2LjRMNDU1LjMgNjY0LjdjLTE2LjMgMTQtNDAuOCAxMi42LTU1LjQtMy4yeiIgZmlsbD0iIzUyQzAxQSIgcC1pZD0iNTMxOCI+PC9wYXRoPjwvc3ZnPg==`,
        error: `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI4Njc1OTcyODQ2IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUzMTYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTExLjYgMTQ4LjJjNDkuNyAwIDk3LjkgOS43IDE0My4yIDI4LjkgNDMuOCAxOC41IDgzLjIgNDUuMSAxMTcgNzguOSAzMy44IDMzLjggNjAuNCA3My4yIDc4LjkgMTE3IDE5LjIgNDUuMyAyOC45IDkzLjUgMjguOSAxNDMuMnMtOS43IDk3LjktMjguOSAxNDMuMmMtMTguNSA0My44LTQ1LjEgODMuMi03OC45IDExNy0zMy44IDMzLjgtNzMuMiA2MC40LTExNyA3OC45LTQ1LjMgMTkuMi05My41IDI4LjktMTQzLjIgMjguOXMtOTcuOS05LjctMTQzLjItMjguOWMtNDMuOC0xOC41LTgzLjItNDUuMS0xMTctNzguOS0zMy44LTMzLjgtNjAuNC03My4yLTc4LjktMTE3LTE5LjItNDUuMy0yOC45LTkzLjUtMjguOS0xNDMuMnM5LjctOTcuOSAyOC45LTE0My4yYzE4LjUtNDMuOCA0NS4xLTgzLjIgNzguOS0xMTcgMzMuOC0zMy44IDczLjItNjAuNCAxMTctNzguOSA0NS4zLTE5LjIgOTMuNS0yOC45IDE0My4yLTI4LjltMC04MGMtMjQ3LjQgMC00NDggMjAwLjYtNDQ4IDQ0OHMyMDAuNiA0NDggNDQ4IDQ0OCA0NDgtMjAwLjYgNDQ4LTQ0OC0yMDAuNi00NDgtNDQ4LTQ0OHoiIGZpbGw9IiM1MkMwMUEiIHAtaWQ9IjUzMTciPjwvcGF0aD48cGF0aCBkPSJNMzk5LjkgNjYxLjVMMjg4LjggNTQxLjhjLTE1LTE2LjItMTQuMS00MS41IDIuMS01Ni41czQxLjUtMTQuMSA1Ni41IDIuMWw1OC45IDYzLjRjMTQuNiAxNS43IDM5IDE3LjEgNTUuMyAzLjJsMjE3LjUtMTg2LjJjMTYuOC0xNC40IDQyLTEyLjQgNTYuNCA0LjQgMTQuNCAxNi44IDEyLjQgNDItNC40IDU2LjRMNDU1LjMgNjY0LjdjLTE2LjMgMTQtNDAuOCAxMi42LTU1LjQtMy4yeiIgZmlsbD0iIzUyQzAxQSIgcC1pZD0iNTMxOCI+PC9wYXRoPjwvc3ZnPg==`,
      },
      notices: [],
    };
  },
  methods: {
    error(massage = "失败，请稍后重试", title = "系统提示") {
      this.notices.push({
        id: Date.now(),
        type: "error",
        title,
        massage,
      });
    },
    success(massage = "成功", title = "系统提示") {
      this.notices.push({
        id: Date.now(),
        type: "success",
        title,
        massage,
      });
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

.notification {
  position: fixed;
  top: 50px;
  right: 30px;
  z-index: 9999999999999999999999999999999999999999999;
  .notice-item {
    margin-top: 20px;
    background: #fff;
    border-radius: 5px;
    width: 380px;
    padding: 20px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
    .flex();
    .icon {
      content: "";
      min-width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .content {
      .flex();
      flex-direction: column;
      margin-left: 5px;
      .title {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.9);
        font-weight: 500;
      }
      .massage {
        margin-top: 5px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.62);
      }
    }
  }
}
</style>
