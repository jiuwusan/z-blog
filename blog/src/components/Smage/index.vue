<template>
  <img :src="fttSrc" class="fit-cover" />
</template>

<script>
import { filePrefix } from "@config";
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
  },
  computed: {
    fttSrc() {
      let prefix = this.prefix;
      switch (Object.prototype.toString.call(prefix)) {
        case "[object String]":
          return (prefix || filePrefix) + this.src;
        case "[object Boolean]":
          if (prefix === true) {
            return require("../../assets/image/" + this.src);
          }
      }
      return this.src;
    },
  },
};
</script>

<style scoped>
.fit-cover {
  object-fit: cover;
}
</style>