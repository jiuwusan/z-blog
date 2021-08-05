<template>
  <div class="guest-box fadeInDownBig flex">
    <div class="title">留言板</div>
    <div class="warning">沟通交流，拉近你我！</div>
    <RichEditor class="editor" v-model="formData.content"></RichEditor>
    <div class="submit-box">
      <div class="submit" @click="formSubmit">提交留言</div>
    </div>
  </div>
</template>
 
<script>
import RichEditor from "@jws/components/RichEditor";
export default {
  data() {
    return {
      formData: {
        imageCode: "",
        content: "123456",
        contact: "",
        nickname: "",
      },
      content: "123456",
    };
  },
  components: {
    RichEditor,
  },
  methods: {
    formSubmit() {
      console.log("formSubmit==", this.content);
    },
    editorChange(e) {
      console.log("editorChange==", e);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.guest-box {
  width: 100%;
  background: #fff;
  padding: 15px;
  flex-direction: column;
  .title {
    font-size: 28px;
    color: #515250;
    text-align: center;
    line-height: 1.2;
  }
  .warning {
    padding: 14px;
    font-size: 17px;
    color: #515250;
    text-align: center;
    line-height: 1.2;
  }
  .editor {
    margin-top: 15px;
  }
  .submit-box {
    margin-top: 15px;
    .submit {
      width: 95px;
      height: 38px;
      line-height: 38px;
      padding: 0 18px;
      background-color: #009688;
      color: #fff;
      white-space: nowrap;
      text-align: center;
      font-size: 14px;
      border: none;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}

.fadeInDownBig {
  animation-name: fadeInDownBig;
  animation-duration: 800ms;
}
</style>