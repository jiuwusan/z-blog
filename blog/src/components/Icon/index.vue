<template>
  <img ref="svgIcon" :src="fttPath" class="svg-icon" />
  <!-- <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg> -->
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  mounted() {
    let fontSize = window.getComputedStyle(this.$refs.svgIcon)["font-size"];
    this.$refs.svgIcon.style.width = fontSize;
  },
  computed: {
    fttPath() {
      return require(`../../assets/svg/${this.name}.svg`);
    },
  },
};
</script>

<style lang="less" scoped>
</style>