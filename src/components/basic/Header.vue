<template>
  <div class="ls-header">
    <div class="title-bar">
      <img src="../../assets/jinghui.png" alt="" />
      <span class="font">{{ url.title }}</span>
      <div class="line"></div>
    </div>

    <div class="navbar">
      <div
        class="navbar-item"
        :class="tabIndex == 1 ? 'navbar-active' : ''"
        @click="navChange(1)"
      >
        待审核
      </div>
      <div
        class="navbar-item"
        :class="tabIndex == 2 ? 'navbar-active' : ''"
        @click="navChange(2)"
      >
        审核中
      </div>
      <div
        class="navbar-item"
        :class="tabIndex == 3 ? 'navbar-active' : ''"
        @click="navChange(3)"
      >
        已审核
      </div>
    </div>
    <div class="user-info" @click="doUserMenuOpen" ref="userInfo">
      <!-- <div class="logo">
        <img src="/icons/portrait.png" alt="police" />
      </div> -->

      <div class="info">
        <div class="caret">{{ displayName }}</div>
      </div>

      <div class="info">
        <el-icon
          style="
            line-height: 36px;
            color: white;
            height: auto;
            transition: all 0.5s;
          "
          :class="userInfoShow ? 'tranTop' : ''"
          ><bottom-icon
        /></el-icon>
      </div>

      <div v-if="userInfoShow" class="userInfo-popmenu">
        <!-- <div @click="changePassword">修改密码</div> -->
        <div @click="doLogout">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import router from "../../router";
import { onClickOutside } from "@vueuse/core";
import { useStore } from "../../store";
import { useContext } from "../../hooks/context";

const { url } = useContext();
const store = useStore();
const userInfoShow = ref(false); //右上角用户信息弹窗
const userInfo = ref();
const displayName = computed(() => {
  return store.state.loginInfo!.name;
});
const tabIndex = ref(2);
const emit = defineEmits(["navChange"]);

//菜单切换
function navChange(value: number) {
  tabIndex.value = value;
  emit("navChange", value);
}

onClickOutside(userInfo, () => {
  userInfoShow.value = false;
});
function doUserMenuOpen() {
  userInfoShow.value = !userInfoShow.value;
}

const doLogout = () => {
  window.sessionStorage.clear();
  router.push({ name: "/login" });
  setTimeout(function () {
    window.location.reload();
  }, 100);
};
</script>

<style lang="scss" scoped>
.ls-header {
  position: fixed;
  top: 0;
  display: flex;
  // flex-direction: column;
  align-items: center;
  // justify-content: center;
  position: fixed;
  z-index: 00;
  left: 0;
  // justify-content: space-between;
  width: 100%;
  height: 64px;
  background: linear-gradient(135deg, #1c3385 0%, #244fbb 100%);
  padding: 0px 30px;
  box-sizing: border-box;
  .torz {
    position: absolute;
    left: 13px;
    top: 6px;
    width: 84px;
    height: 30px;
    background: #24346d;
    line-height: 30px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    opacity: 0.8;
  }
  .title-bar {
    display: flex;
    align-items: center;
    line-height: 64px;
    color: #fff;
    font-size: 18px;
    .font {
      -webkit-background-clip: text;
      font-size: 28px;
      font-family: PangMenZhengDao-Regular, PangMenZhengDao;
      font-weight: 400;
      color: #ffffff;
      text-shadow: 0px 0px 30px rgba(0, 25, 178, 0.15);
      margin-left: 20px;
    }
    img {
      width: 38px;
      height: 38px;
    }
    .line {
      width: 0px;
      height: 24px;
      opacity: 0.5;
      border: 1px solid #ffffff;
      margin-left: 22px;
    }
  }
  .user-info {
    // float: right;
    // width: 140px;
    height: 36px;
    // background: #182966;
    // border: 1px solid #1e2b5d;
    border-radius: 18px 0 0 18px;
    // margin-top: -13px;
    user-select: none;
    position: absolute;
    right: 13px;
    top: 14px;
    display: flex;
    align-items: center;
    .userInfo-popmenu {
      text-align: center;
      position: fixed;
      top: 60px;
      right: 8px;
      width: 115px;
      padding: 5px 0;
      background: #ffffff;
      box-shadow: 0px 5px 15px 0px rgba(144, 144, 144, 0.5);
      border-radius: 4px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #000;
      line-height: 30px;
      z-index: 305;
      div:hover {
        background: #b5b6b6;
      }
    }
    .logo {
    }
    .info {
      margin-left: 10px;

      .caret {
        font-size: 14px;
        font-family: Source Han Sans CN;
        // font-weight: bold;
        color: #fff;
        line-height: 36px;
        // opacity: 0.6;
      }
      .tranTop {
        transform: rotate(180deg);
      }
    }
  }

  .navbar {
    margin-left: 20px;
    display: flex;
    align-items: center;
    .navbar-item {
      width: 100px;
      height: 38px;
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
      font-size: 16px;
      font-family:
        Noto Sans CJK-Bold,
        Noto Sans CJK;
      color: #ffffff;
      line-height: 38px;
      text-align: center;
      cursor: pointer;
      margin-right: 24px;
    }
    .update-btn {
      color: #fff;
      font-size: 12px;
      padding: 4px 16px;
      border-radius: 8px;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 6px #223fa4;
        background: linear-gradient(180deg, #5882f8 0%, #2355dc 100%);
      }
      .change-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      }
      .text {
        margin-top: 0px;
      }
    }
    .navbar-active {
      background: linear-gradient(180deg, #5882f8 0%, #2355dc 100%);
      box-shadow: 0px 0px 30px 1px rgba(0, 26, 154, 0.3);
      font-weight: bold;
    }
  }
}
</style>
<style>
.el-message {
  min-width: 100px;
}
</style>
