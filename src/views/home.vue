<template>
  <div class="common-layout">
    <el-container style="diaplay: flex; flex-direction: column">
      <el-menu
        mode="horizontal"
        :default-active="DefaultRoute"
        class="el-menu-vertical-demo"
      >
        <div class="herter_box">
          <!-- <div class="img_box"> -->
          
          <!-- </div> -->
          <div class="title">穆棱</div>
          <div class="segmentation"></div>
        </div>
        <el-menu-item
          v-for="item in systemList"
          :key="item.resCode"
          :index="item.resCode"
          @click="onMenu(item)"
        >
          <span style="font-size: 16px">{{ item.name }}</span>
        </el-menu-item>
        <div class="userInfo-popmenu" v-if="userInfoShow" @click="doLogout">
          <div>退出登录</div>
        </div>
      </el-menu>
      <el-container style="overflow: auto">
        <div class="aside" v-if="store.state.menuList?.length > 0">
          <Sider
            :display-menu-tree="store.state.menuList"
            @onMeneChange="handleMeneChange"
          />
        </div>
        <el-main id="main" class="layout_main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <div class="right">
    <div id="user-info" @click="doUserMenuOpen" ref="userInfo">
      <div style="display: inline-block; display: flex; align-items: center">
        <div class="segmentation1"></div>
        <div id="info" style="color: #fff">
          {{ store.state.loginInfo?.phone || "" }}
        </div>
        <div class="infoIcon">
          <el-icon
            :class="userInfoShow ? 'tranTop' : ''"
            style="
              line-height: 36px;
              color: white;
              height: auto;
              transition: all 0.5s;
            "
          >
            <CaretBottom />
          </el-icon>
        </div>
        <div class="caret"></div>
      </div>
    </div>
  </div>
  <div class="userInfo-popmenu" v-if="userInfoShow">
    <div @click="doLogout">退出登录</div>
    <div @click="restPassWordShowFun" v-if="store.state.isRestPassWord">
      账号密码设置
    </div>
  </div>
  <RestPassWord
    v-if="restPassWordShow"
    @changePassWord="changePassWord"
    :dialogVisible="restPassWordShow"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { CaretBottom } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store";
import Sider from "../components/basic/sider.vue";
import RestPassWord from "./resetPw.vue";
const route = useRoute();
const router = useRouter();
const store = useStore();
const restPassWordShow = ref(false); //修改密码
const userInfoShow = ref(false); //右上角用户信息弹窗
const userInfo = ref();

const systemList = [
  {
    id: "1668076307868553218",
    name: "待审核",
    parentId: "1668075409826123777",
    sort: 1,
    url: "/dsh",
    description: "",
    resCode: "dsh",
    resType: "dsh",
    icon: "",
  },
  {
    id: "1668076395948937218",
    name: "审核中",
    parentId: "1668075409826123777",
    sort: 2,
    url: "/shz",
    description: "",
    resCode: "shz",
    resType: "shz",
    icon: "",
  },
  {
    id: "1668076527029325825",
    name: "已审核",
    parentId: "1668075409826123777",
    sort: 3,
    url: "/ysh",
    description: "",
    resCode: "ysh",
    resType: "ysh",
    icon: "",
  },
];
const restPassWordShowFun = () => {
  restPassWordShow.value = true;
};
//修改密码后退出
const changePassWord = (flag: boolean) => {
  restPassWordShow.value = false;
  flag && doLogout();
};
const onMenu = (item: any) => {
  router.push(item.url);
  if (item.children) {
    store.commit("changeMenu", item.children);
  } else {
    store.commit("changeMenu", []);
  }
};

const DefaultRoute = ref("");

onClickOutside(userInfo, () => {
  userInfoShow.value = false;
});
function doUserMenuOpen() {
  userInfoShow.value = !userInfoShow.value;
}

const handleMeneChange = (value: any) => {
  console.log(value);
};

const doLogout = () => {
  window.sessionStorage.clear();
  store.commit("changeMenu", []);
  store.commit("setSystemList", []);
  router.push("/login");
};

onMounted(() => {
  const Route = router.currentRoute.value.fullPath.split("/")[1];
  if (Route !== "home") {
    DefaultRoute.value = Route;
  }
  if (route.query.spzx) {
    DefaultRoute.value = "spzx";
  }
  if (
    router.currentRoute.value.fullPath.includes("/spzx") &&
    !router.currentRoute.value.fullPath.includes("/cl")
  ) {
    const obj = store.state.systemList.filter(
      (item: { resCode: string }) => item.resCode == Route
    );
    if (obj[0]?.children) {
      store.commit("changeMenu", obj[0]?.children);
      router.push(obj[0].children[0].url);
    } else {
      store.commit("changeMenu", []);
      router.push(obj[0].url);
    }
  } else {
    store.commit("changeMenu", []);
  }
});

watch(
  () => store.state.systemList,
  (newValue: any) => {
    if (newValue.length > 0) {
      DefaultRoute.value = newValue[0].resCode;
      router.push(newValue[0].url);
    }
    // store.state.systemList
  }
);

// 监听当前路由
watch(
  () => router.currentRoute.value.fullPath,
  (newValue: any) => {
    const Route = router.currentRoute.value.fullPath.split("/")[1];
    console.log("newValue", newValue, Route, route.query);
    if (Route !== "home") {
      DefaultRoute.value = Route;
    } else {
      router.push("/dsh");
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}
.herter_box {
  display: flex;
  align-items: center;

  img {
    margin: 0 20px;
    width: 40px;
    height: 40px;
  }

  .title {
    // font-size: 24px;
    // color: #fff;
    // font-weight: 700;
    font-size: 28px;
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    font-weight: 400;
    color: #ffffff;
    line-height: 0px;
    text-shadow: 0px 0px 30px rgba(0, 25, 178, 0.15);
    -webkit-background-clip: text;
  }
}

.el-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(129deg, #2360d9 0%, #1d93f2 100%);
  box-shadow: -5px 3px 10px 1px rgba(0, 0, 0, 0.16);
  border-radius: 0px 0px 4px 0px;
  opacity: 1;
  height: 72px;
  line-height: 72px;
}

.userInfo-popmenu {
  cursor: pointer;
  text-align: center;
  position: fixed;
  top: 60px;
  //   right: 325px;
  right: 70px;

  width: 115px;
  padding: 5px 0;
  //   background: rgba(24, 41, 102, 0.9);
  background: #fff;
  box-shadow: 0px 5px 15px 0px rgba(0, 19, 86, 0.5);
  border-radius: 4px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #000;
  line-height: 30px;
  z-index: 99998 !important;
}

.right {
  height: 72px;
  line-height: 72px;
  position: fixed;
  top: 0px;
  right: 70px;
  // border-left: 1px solid #FFFFFF;
}

#user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-menu {
  height: 72px;
  background: #171e49;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  display: flex;
  align-items: center;
}

.el-menu-item.is-active {
  // color: #fff;
}

.el-menu-item {
  justify-content: center;
}

.el-main {
  --el-main-padding: 20px 0px;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: #171e49;
  color: #fff;
}

.el-menu--horizontal > .el-menu-item.is-active {
  background: linear-gradient(158deg, #34aeff 0%, #253fe0 100%);
  box-shadow: 0px 0px 30px 1px rgba(0, 26, 154, 0.3);
  border-radius: 8px 8px 8px 8px;
  opacity: 1;
  color: #fff !important;
  font-weight: bold;
}

.el-menu--horizontal > .el-menu-item {
  height: 38px;
  font-style: 16px !important;
  color: #fff;
  border-bottom: none;
}

.segmentation {
  width: 0px;
  height: 24px;
  opacity: 0.5;
  border: 1px solid #fff;
  margin-left: 25px;
  margin-right: 8px;
}

.segmentation1 {
  width: 0px;
  height: 18px;
  opacity: 0.5;
  border: 1px solid #fff;
  margin-right: 16px;
}

.infoIcon {
  padding-top: 5px;
  margin-left: 15px;

  .tranTop {
    transform: rotate(180deg);
  }
}

.el-header {
  padding: 0;
  z-index: 100;
  // background: var(--header-bg);
}

.aside {
  box-shadow: 0 2px 10px #f1f1f1;
  // width: 195px;
  z-index: 1;
  position: relative;
  overflow: initial;
}

.layout_main {
  &::-webkit-scrollbar {
    height: 12px;
  }
  height: calc(100vh - 72px);
  padding: 18px 24px;
  box-sizing: border-box;
  margin: 0;
  background: #f2f6ff;
  border-radius: 0px 0px 0px 0px;
}

.main-wrapper {
  position: relative;
  // height: calc(100vh - 72px);
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0px 0px 30px 1px rgba(0, 15, 52, 0.07);
  border-radius: 8px 8px 8px 8px;
  opacity: 1;
}

.main-wrapperor {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  padding: 0;
}
</style>
