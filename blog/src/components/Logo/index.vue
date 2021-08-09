<template>
  <div @click="goIndex" class="logo">Zhou.Yuan</div>
</template>

<script>
export default {
  methods: {
    goIndex() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.logo {
  font-family: BarbaraHand;
  color: #686967;
  text-decoration: none;
  font-size: 50px;
  white-space: nowrap;
  cursor: pointer;
}
</style>