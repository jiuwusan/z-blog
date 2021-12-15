<template>
  <div @click="goIndex" class="logo">{{ name }}</div>
</template>

<script>
export default {
  name: "Logo",
  components: {},
  data() {
    return {
      profile: {},
    };
  },
  computed: {
    name() {
      return this.$store.state.profile.general.name;
    },
  },
  methods: {
    goIndex() {
      this.$emit("success", {});
      this.$router.push("/");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";
.logo {
  font-family: BarbaraHand;
  color: #686967;
  text-decoration: none;
  font-size: 50px;
  white-space: nowrap;
  cursor: pointer;
}
</style>