<template>
  <div class="classify flex slideInRight">
    <div class="search-box">
      <div class="search flex">
        <input v-model="search" placeholder="输入关键字搜索" class="input" @keyup.enter="submit" />
        <div class="submit flex" @click="submit">
          <Icon name="search" class="icon"></Icon>
        </div>
      </div>
    </div>
    <div class="class-list">
      <div class="class-ul">
        <div
          :class="['class-li', activefy === item.uid ? 'active' : '']"
          v-for="item in list"
          :key="item.uid"
          @click="classChange(item.uid)"
        >
          <Smage
            v-if="item.cover"
            prefix
            class="cover"
            :src="item.cover"
          ></Smage>
          <div class="class-txt">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activefy: "",
      search: "",
      label: "",
    };
  },
  computed: {
    list() {
      return this.$store.state.archives.classify;
    },
  },
  mounted() {
    let { search = "", classfiy = "99", label = "" } = this.$route.query || {};
    this.search = search;
    this.activefy = classfiy;
    this.label = label;
  },
  methods: {
    submit() {
      this.$router.replace(
        `/article?search=${this.search}&classfiy=${this.activefy}&label=${this.label}`
      );
    },
    classChange(activefy) {
      this.activefy = activefy;
      this.$router.replace(
        `/article?search=${this.search}&classfiy=${activefy}&label=${this.label}`
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@jws/css/animate.css";
@import "~@/global.less";

.checked() {
  background: #f8f9f7;
  &::after {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    height: 100%;
    border-right: 4px solid #484947;
  }
}

.classify {
  width: 100%;
  position: relative;
  background-color: #fff;
  flex-direction: column;
  .search-box {
    width: 100%;
    padding: 20px;
    background-color: grey;
    .search {
      height: 40px;
      padding: 0 20px;
      background-color: #fff;
      border-radius: 40px;
      position: relative;
      z-index: 5;
      .input {
        height: 40px;
        line-height: 40px;
        flex-grow: 1;
        box-shadow: none;
        background-color: transparent;
        color: #515250;
        outline: 0;
        margin: 0;
        padding: 0;
        border: 0;
      }
      .submit {
        white-space: nowrap;
        word-break: break-all;
        padding: 6px;
        cursor: pointer;
        .icon {
          font-size: 18px;
        }
      }
    }
  }

  .class-list {
    width: 100%;
    background: #fff;
    padding: 20px 0;
    .class-ul {
      width: 100%;
      .active {
        .checked();
      }
      .class-li {
        width: 100%;
        margin: 0;
        padding: 0 20px;
        color: #515250;
        line-height: 40px;
        height: 40px;
        cursor: pointer;
        position: relative;
        .flex();
        align-items: center;
        &:hover {
          .checked();
        }

        .cover {
          width: 30px;
          height: 30px;
        }

        .class-txt {
          width: 100%;
          border-bottom: 1px solid #f8f9f7;
          margin-left: 8px;
        }
      }
    }
  }
}

.slideInRight {
  animation-name: slideInRight;
  animation-duration: 500ms;
}
</style>