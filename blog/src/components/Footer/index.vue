<template>
  <div class="footer flex" v-if="profile">
    <div
      class="footer-item flex"
      v-for="item in profile?.list || []"
      :key="item.title"
    >
      <div class="title">{{ item.title }}</div>
      <div
        class="definite flex"
        v-for="link in item?.content || []"
        :key="link.icon"
      >
        <Smage prefix class="icon" :src="link.icon"></Smage>
        <div class="txt">{{ link.text }}</div>
      </div>
    </div>
  </div>
  <div class="copyright">
    {{ profile?.signature }}
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    profile() {
      return this.$store.state.profile.footer;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.footer {
  width: 100%;
  background: #232328;
  padding: 60px 90px;
  color: #fff;
  // margin-top: 20px;
  .footer-item {
    flex-direction: column;
    flex-grow: 1;
    padding-left: 40px;
    .title {
      font-size: 18px;
      white-space: nowrap;
      margin-bottom: 20px;
    }
    .definite {
      color: #eee;
      font-size: 14px;
      margin-bottom: 10px;
      padding-left: 10px;
      align-items: center;
      .icon {
        width: 16px;
        height: 16px;
      }
      .txt {
        padding-left: 5px;
      }
    }
  }
}

.copyright {
  padding: 15px;
  background: #1d1d21;
  text-align: center;
  color: #bbb;
  font-size: 14px;
}
</style>