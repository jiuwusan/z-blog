<template>
  <div class="footer flex" v-if="data">
    <div
      class="footer-item flex"
      v-for="item in (data?.profile?.list || [])"
      :key="item.title"
    >
      <div class="title">{{ item.title }}</div>
      <div
        class="definite flex"
        v-for="link in (item?.content || [])"
        :key="link.icon"
      >
        <Smage prefix class="icon" :src="link.icon"></Smage>
        <div class="txt">{{ link.text }}</div>
      </div>
    </div>
  </div>
  <div class="copyright">
    {{ data?.profile?.signature || "Copyright © JiuWuSan" }}
  </div>
</template>

<script>
import { configApi } from "@/api";
export default {
  name: "Footer",
  components: {},
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    async getConfig() {
      let result = await configApi.findById({
        uid: "fb57a600-eace-11eb-96b5-e73f4408ddb6",
      });
      result.profile && (result.profile = JSON.parse(result.profile));
      this.data = result;
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