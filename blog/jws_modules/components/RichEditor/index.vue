<template>
  <div class="ck-editor-box" v-highlight>
    <ckeditor
      :editor="editor"
      :model-value="value"
      :config="editorConfig"
      :disabled="disabled"
      @input="editorInput"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import CKEditor from "@ckeditor/ckeditor5-vue";
import "./zh-cn.js";
export default {
  name: "RichEditor",
  emits: ["update:value"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: String,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>请输入...</p>",
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          CodeBlock,
        ],
        toolbar: {
          items: [
            "bold",
            "|",
            "italic",
            "|",
            "link",
            "|",
            "codeBlock",
            "undo",
            "redo",
          ],
          shouldNotGroupWhenFull: true,
        },
        language: "zh-cn",
      },
    };
  },
  components: {
    ckeditor: CKEditor.component,
  },
  mounted() {},
  methods: {
    editorInput(value) {
      this.$emit("update:value", value);
    },
  },
};
</script>

<style lang="less">
.ck-editor-box {
  width: 100%;
}
.ck-editor__editable_inline {
  min-height: 150px !important;
}
</style>