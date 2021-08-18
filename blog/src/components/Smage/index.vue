<template>
  <img
    @click="onPreview"
    :src="lastSrc"
    v-if="lastSrc"
    :class="['fit-cover', lastPreview ? 'pointer' : '']"
  />
</template>

<script>
import { filePrefix } from "@config";
import { Zmage } from "@jws/components";
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
    prefix: {
      type: [String, Boolean],
      default: true,
    },
    preview: {
      type: [String, Boolean],
      default: false,
    },
  },
  data() {
    return {
      lastSrc: "",
      lastPreview: false,
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(newValue) {
        this.lastSrc = this.fttSrc(newValue);
      },
    },
    preview: {
      immediate: true,
      handler(newValue) {
        this.lastPreview = this.fttPreview(newValue);
      },
    },
  },
  mounted() {},
  methods: {
    fttPreview(preview) {
      switch (Object.prototype.toString.call(preview)) {
        case "[object String]":
          return true;
        case "[object Boolean]":
          return preview;
      }
    },
    fttSrc(src) {
      src = src || this.src;
      if (!src) {
        return "";
      }
      let prefix = this.prefix;
      switch (Object.prototype.toString.call(prefix)) {
        case "[object String]":
          return (prefix || filePrefix) + src;
        case "[object Boolean]":
          if (prefix === true) {
            return require("../../assets/image/" + src);
          }
      }
      return src;
    },
    onPreview() {
      if (!this.lastPreview) {
        return;
      }
      Zmage.show(this.lastSrc);
    },
  },
};
</script>

<style scoped>
.fit-cover {
  object-fit: cover;
}

.pointer {
  cursor: pointer;
}
</style>