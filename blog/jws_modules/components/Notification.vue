<template>
  <div class="notification-overlay">
    <div v-show="title" class="title">{{ title }}</div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: "notification",
  data() {
    return {
      visible: false,
      title: "",
      content: "",
      duration: 1500,
    };
  },
  methods: {
    setTimer() {
      setTimeout(() => {
        this.close(); // 3000ms之后调用关闭方法
      }, this.duration);
    },
    success(msg = "系统提示") {
      this.content = msg;
      this.visible = true;
    },
    close() {
      this.visible = false;
      setTimeout(() => {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el); // 从DOM里将这个组件移除
      }, 500);
    },
  },
  mounted() {
    this.setTimer(); // 挂载的时候就开始计时，3000ms后消失
  },
};
</script>

<style scoped>
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

.notification-overlay {
  box-sizing: border-box;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 7px;
  color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-size: 14px;
}

.notification-overlay .title {
  border-bottom: 1px solid rgba(255, 255, 255, 1);
}

.notification-overlay .content {
  max-width: 80vw;
}
</style>