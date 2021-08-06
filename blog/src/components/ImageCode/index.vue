<template>
  <div v-if="codeData" class="image-code-box">
    <input
      type="text"
      class="input"
      placeholder="请输入图形验证码"
      @input="inputCode"
      :value:="code"
    />
    <div class="exchange" @click="exchange">
      <img class="code" :src="codeData.base64" alt="" />
      <div class="warning">换一张？</div>
    </div>
  </div>
</template>

<script>
import { authApi } from "@/api";
export default {
  props: {
    value: [String, Number],
  },
  emits: ["update:value"],
  data() {
    return {
      codeData: null,
      code: "",
    };
  },
  watch: {
    value(newValue) {
      console.log("----", newValue);
      newValue = newValue || "";
      let valueArray = newValue.split("_");
      if (valueArray.length === 2 && valueArray[1] != this.code) {
        this.code = valueArray[1];
      }
    },
  },
  mounted() {
    this.exchange();
  },
  methods: {
    async exchange() {
      let codeData = await authApi.imageCode({ lastkey: this.codeData?.key });
      this.codeData = codeData;
    },
    inputCode(e) {
      this.$emit(
        "update:value",
        `${this.codeData?.key || ""}_${e.target.value}`
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.image-code-box {
  .flex();
  .input {
    padding: 0 5px;
    width: 200px;
    border: 1px solid #c4c4c4;
    height: 40px;
    &:focus {
      //获取焦点
      outline: 0.5px solid hsl(208, 79%, 51%); //边框不用border，用outline
      //   background: rgba(3, 16, 28, 0); //背景色
    }
  }
  .exchange {
    .flex();
    align-items: center;
    cursor: pointer;
    margin-left: 10px;
    .code {
      width: 80px;
      height: 40px;
    }
    .warning {
      color: #6bc30d;
      padding-left: 5px;
      font-size: 12px;
    }
  }
}
</style>