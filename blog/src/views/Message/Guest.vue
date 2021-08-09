<template>
  <div class="guest-box fadeInDownBig flex">
    <div class="title">留言板</div>
    <div class="warning">沟通交流，拉近你我！</div>
    <RichEditor class="editor" v-model:value="formData.content"></RichEditor>
    <div class="form-item-box">
      <div class="form-item">
        <div class="label">您的昵称：</div>
        <input
          type="text"
          class="my-input"
          placeholder="请输入昵称"
          v-model="formData.nickname"
        />
      </div>
      <div class="form-item">
        <div class="label">联系方式：</div>
        <input
          type="text"
          class="my-input"
          placeholder="请输入邮箱、手机号码等"
          v-model="formData.contact"
        />
      </div>
      <div class="form-item">
        <div class="label">验证码：</div>
        <ImageCode
          class="imagecode"
          v-model:value="formData.imageCode"
        ></ImageCode>
      </div>
    </div>
    <div class="submit-box">
      <div class="submit" @click="formSubmit">提交留言</div>
    </div>
  </div>
</template>
 
<script>
import RichEditor from "@jws/components/RichEditor";
import ImageCode from "@/components/ImageCode";
export default {
  data() {
    return {
      formData: {
        imageCode: "",
        content: "",
        contact: "",
        nickname: "",
      },
    };
  },
  components: {
    RichEditor,
    ImageCode,
  },
  methods: {
    async formSubmit() {
      this.$emit("submit", this.formData);
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
  .form-item-box {
    .flex();
    align-items: center;
    margin: 10px 0 0 0px;
    .form-item {
      margin: 10px 0 0 20px;
      &:first-child {
        margin: 10px 0 0 0px;
      }
      .label {
        color: #515250;
        font-size: 18px;
        margin-bottom: 10px;
      }

      .my-input {
        height: 40px;
        padding: 0 5px;
        width: 200px;
        border: 1px solid #c4c4c4;
        &:focus {
          //获取焦点
          outline: 0.5px solid hsl(208, 79%, 51%); //边框不用border，用outline
          //   background: rgba(3, 16, 28, 0); //背景色
        }
      }
    }
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