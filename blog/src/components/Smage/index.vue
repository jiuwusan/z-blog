<template>
  <img :src="fttSrc" class="fit-cover" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
      default: "",
    },
  },
  computed: {
    fttSrc() {
      return require("../../assets/image/" + this.src);
    },
  },
};
</script>

<style scoped>
.fit-cover {
  object-fit: cover;
}
</style>