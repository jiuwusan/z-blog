<template>
  <div class="label-box slideInRight">
    <div class="title">
      <Icon name="label" class="icon"></Icon>
      <div>文章标签</div>
    </div>
    <div class="label-list">
      <div
        class="label-item"
        :class="['class-li', activeLabel === item.uid ? 'active' : '']"
        v-for="item in list"
        :key="item.uid"
        @click="onChange(item.uid)"
      >
        <Smage prefix class="icon" :src="item.cover"></Smage>
        <div class="txt">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { labelApi } from "@/api";
export default {
  data() {
    return {
      list: [],
      activeLabel: "",
      search: "",
      label: "",
    };
  },
  mounted() {
    let { search = "", classfiy = "99", label = "" } = this.$route.query || {};
    this.search = search;
    this.activefy = classfiy;
    this.label = label;
    this.query();
  },
  methods: {
    //获取数据
    async query() {
      let result = (await labelApi.query()) || [];
      this.list = result;
    },
    onChange(label) {
      if (this.activeLabel === label) {
        label = "";
      }
      this.activeLabel = label;
      this.$router.replace(
        `/article?search=${this.search}&classfiy=${this.activefy}&label=${label}`
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";
.label-box {
  width: 100%;
  background: #f8f9f7;
  padding: 0 15px 0 20px;
  .title {
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #e8e9e7;
    font-weight: 400;
    border-bottom: 1px solid #e8e9e7;
    color: #383937;
    position: relative;
    font-size: 18px;
    .flex();
    align-items: center;
    .icon {
      font-size: 18px;
      margin-right: 5px;
    }
  }
  .label-list {
    width: 100%;
    padding: 10px 0;
    .flex();
    flex-wrap: wrap;
    margin: 0 0 0 -4px;
    .label-item {
      padding: 4px;
      background: #f1f2f0;
      border-radius: 4px;
      cursor: pointer;
      .flex();
      align-items: center;
      border: 1px solid #e8e9e7;
      margin: 4px;
      .icon {
        width: 14px;
        height: 14px;
      }
      .txt {
        margin-left: 5px;
        font-size: 12px;
        color: #787977;
      }
    }
    .active {
      background: #6bc30d;
      .txt {
        color: #f1f2f0;
      }
    }
  }
}

.slideInRight {
  animation-name: fadeInUpBig;
  animation-duration: 500ms;
}
</style>