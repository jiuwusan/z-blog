<template>
  <div class="link-box flex" v-if="profile">
    <Smage v-if="profile.left" prefix :src="profile.left" class="saodi"></Smage>
    <div class="content-box">
      <div class="content">
        <div class="title">{{ profile.title }}</div>
        <div class="askfor flex">
          <block v-for="item in profile.rules" :key="item.icon">
            <div class="item flex">
              <Smage prefix :src="item.icon" class="icon"></Smage>
              <div class="txt">{{ item.text }}</div>
            </div>
          </block>
        </div>
        <div class="askcont">
          {{ profile.declare }}
        </div>
        <div class="warning">
          {{ profile.warning }}
        </div>
      </div>
      <div class="link-list flex" v-if="links">
        <block v-for="item in links" :key="item.uid">
          <a class="link-item flex" :href="item.link" target="_blank">
            <div class="row flex">
              <Smage prefix :src="item.logo" class="logo"></Smage>
              <div class="name">{{ item.name }}</div>
            </div>
            <div class="row">
              {{ item.desc }}
            </div>
          </a>
        </block>
      </div>
    </div>
  </div>
</template>

<script>
import { linkApi } from "@/api";
export default {
  data() {
    return {
      links: null,
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile.link;
    },
  },
  mounted() {
    this.getLinks();
  },
  methods: {
    async getLinks() {
      let result = await linkApi.query();
      this.links = result;
    },
    toLink() {},
  },
};
</script>

<style lang="less" scoped>
@import "~@/global.less";

@media screen and (min-width: 751px) {
  .link-box {
    width: @defaultWidth;
    // min-height: 90vh;
    position: relative;
    margin: 25px auto 15px auto;
    .saodi {
      width: 185px;
    }
    .content-box {
      flex-grow: 1;
      margin-left: 15px;
      .content {
        width: 100%;
        background: #fff;
        padding: 15px;
        .title {
          margin-bottom: 25px;
          padding-left: 14px;
          border-left: 4px solid #6bc30d;
          font-weight: 700;
          font-size: 20px;
          line-height: 20px;
        }
        .askfor {
          color: #515250;
          font-size: 14px;
          flex-wrap: wrap;
          padding-left: 16px;
          .item {
            margin-right: 8px;
            align-items: center;
            font-size: 16px;
            .icon {
              width: 14px;
              height: 14px;
            }
            .txt {
              margin-left: 4px;
            }
          }
        }
        .askcont {
          white-space: pre-line;
          padding-left: 16px;
          color: #515250;
          font-size: 14px;
          line-height: 22px;
          margin: 20px 0;
          .row {
            margin-top: 4px;
          }
        }
        .warning {
          padding-left: 16px;
          color: red;
          font-size: 14px;
          opacity: 0.7;
        }
      }

      .link-list {
        margin-top: 20px;
        flex-wrap: wrap;
        .link-item {
          text-decoration: none;
          width: 258px;
          padding: 15px;
          margin: 15px 15px 0 0px;
          flex-direction: column;
          background: #fff;
          cursor: pointer;
          &:nth-child(4n) {
            margin: 15px 0px 0 0px;
          }
          .row {
            margin-top: 14px;
            color: #333;
            font-size: 13px;
            align-items: center;
            &:first-child {
              margin-top: 0px;
            }
            .logo {
              width: 40px;
              height: 40px;
              border-radius: 100%;
            }
            .name {
              color: #333;
              font-size: 17px;
              padding-left: 8px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .link-box {
    // width: 355px;
    // min-height: 90vh;
    position: relative;
    margin: 15px 10px 5px 10px;
    .saodi {
      width: 185px;
    }
    .content-box {
      flex-grow: 1;
      .content {
        width: 100%;
        background: #fff;
        padding: 15px;
        .title {
          margin-bottom: 25px;
          padding-left: 14px;
          border-left: 4px solid #6bc30d;
          font-weight: 700;
          font-size: 20px;
          line-height: 20px;
        }
        .askfor {
          color: #515250;
          font-size: 14px;
          flex-wrap: wrap;
          padding-left: 16px;
          .item {
            margin-right: 8px;
            align-items: center;
            font-size: 16px;
            .icon {
              width: 14px;
              height: 14px;
            }
            .txt {
              margin-left: 4px;
            }
          }
        }
        .askcont {
          white-space: pre-line;
          padding-left: 16px;
          color: #515250;
          font-size: 14px;
          line-height: 22px;
          margin: 20px 0;
          .row {
            margin-top: 4px;
          }
        }
        .warning {
          padding-left: 16px;
          color: red;
          font-size: 14px;
          opacity: 0.7;
        }
      }

      .link-list {
        margin-top: 0px;
        flex-direction: column;
        .link-item {
          box-sizing: border-box;
          text-decoration: none;
          width: 100%;
          padding: 15px;
          margin: 15px 15px 0 0px;
          flex-direction: column;
          background: #fff;
          cursor: pointer;
          &:nth-child(4n) {
            margin: 15px 0px 0 0px;
          }
          .row {
            margin-top: 14px;
            color: #333;
            font-size: 13px;
            align-items: center;
            &:first-child {
              margin-top: 0px;
            }
            .logo {
              width: 40px;
              height: 40px;
              border-radius: 100%;
            }
            .name {
              color: #333;
              font-size: 17px;
              padding-left: 8px;
            }
          }
        }
      }
    }
  }
}

</style>