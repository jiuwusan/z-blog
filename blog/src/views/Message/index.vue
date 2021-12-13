<template>
  <div class="message-box">
    <Guest @submit="formSubmit"></Guest>
    <div class="board-box fadeInUpBig flex" v-if="boards.length > 0">
      <Board v-for="item in boards" :key="item.uid" :data="item"></Board>
    </div>
  </div>
</template>

<script>
import Guest from "./Guest.vue";
import Board from "./Board.vue";
import { messageApi } from "@/api";
import { util } from "@jws";
export default {
  data() {
    return {
      scrollshow: "bounceInUp",
      boards: [],
      page: 1,
      pageSize: 10,
      totalSize: 0,
    };
  },
  components: {
    Guest,
    Board,
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.loadData();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    async pageQuery(page) {
      page = page || this.page || 1;
      if (this.totalSize > 0 && this.totalSize <= this.boards.length) {
        //数据已经全部加载
        return;
      }

      let result = await messageApi.pageQuery({ page, pageSize: 10 });
      Array.prototype.push.apply(this.boards, result?.datalist || []);
      this.totalSize = result?.totalSize;
      this.page = result?.page + 1;
    },
    async formSubmit(formData, reset) {
      await messageApi.save(formData);
      reset();
      this.$notification.success("提交成功，等待博主审核！！！");
      //提交成功
    },
    onScroll() {
      let innerHeight = document.querySelector("#app").clientHeight;
      let outerHeight = document.documentElement.clientHeight;
      let scrollTop = document.body.scrollTop
        ? document.body.scrollTop
        : document.documentElement.scrollTop;
      // 页面高度 = 屏幕高度 + 滑动高度
      if (innerHeight < outerHeight + scrollTop + 300) {
        this.loadData();
      }
    },
    loadData: util.debounce(function () {
      this.pageQuery();
    }, 500),
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";
@media screen and (min-width: 751px) {
  .message-box {
    width: @defaultWidth;
    min-height: 90vh;
    position: relative;
    flex-direction: column;
    margin: 15px auto;
  }
  .board-box {
    width: 100%;
    margin-top: 20px;
    flex-direction: column;
    // background: #fff;
  }

  .bounceInUp {
    animation-name: bounceInUp;
    animation-duration: 800ms;
  }

  .fadeInUpBig {
    animation-name: fadeInUpBig;
    animation-duration: 800ms;
  }
}

@media screen and (max-width: 750px) {
  .message-box {
    width: 95vw;
    // min-height: 90vh;
    position: relative;
    flex-direction: column;
    margin: 12px auto;
  }
  .board-box {
    width: 100%;
    margin-top: 12px;
    flex-direction: column;
    // background: #fff;
  }

  .bounceInUp {
    animation-name: bounceInUp;
    animation-duration: 800ms;
  }

  .fadeInUpBig {
    animation-name: fadeInUpBig;
    animation-duration: 800ms;
  }
}
</style>