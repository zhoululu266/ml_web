<template>
  <div class="dj-page">
    <div class="dj-top"><TimeBox /></div>
    <div class="dj-content">
      <Left />
      <Center />
      <Right />
    </div>
    <!-- <div class="dj-bottom">
      <Bottom />
    </div> -->
    <div class="back-btn" @click="() => changeShowFun()"></div>
  </div>
</template>

<script setup lang="ts">
import Left from "./left.vue";
import Right from "./right.vue";
import Center from "./center.vue";
import Bottom from "./bottom.vue";
import TimeBox from "@/components/timeBox.vue";
import { axiosFormData } from "@/utils";
import { useMain } from "@/store";
import { useRouter } from "vue-router";

const router = useRouter();
const mainStore = useMain();
const url = `${$config.api}`;
// 跳转到党建
const changeShowFun = () => {
  router.replace({
    path: "/home",
  });
};
//平均审理天数
const getPjsltsData = async () => {
  const api = `${url}/homePage/case/successNumber`;
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ djPjslts: res.data });
    });
  } catch (error) {
    console.error(error);
  }
};
//诉源治理调解数
// const getSyzlData = async () => {
//   const api = `${url}/homePage/case/successNumber`;
//   try {
//     axiosFormData(api).then((res: any) => {
//       mainStore.setPageList({ djSyzl: res.data });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
//服判息诉率
const getFpxslData = async () => {
  const api = `${url}/homePage/case/successNumber`;
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ djfpxsl: res.data });
    });
  } catch (error) {
    console.error(error);
  }
};
//审批案件数
const getSpajsData = async () => {
  const api = `${url}/homePage/case/successNumber`;
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ djSpajs: res.data });
    });
  } catch (error) {
    console.error(error);
  }
};
// 党员人数
const getLeftDyrsData = async () => {
  const api = `${url}/partyBuilding/info`;
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ djDyrs: res });
    });
  } catch (error) {
    console.error(error);
  }
};
// 文章
const getRightNewsData = async () => {
  const api = `${url}/partyBuilding/news`;
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ djNews: res });
    });
  } catch (error) {
    console.error(error);
  }
};
// 党员案件数 溯源治理
const getSyzlData = async () => {
  const api = `${url}/partyBuilding/cont`;
  try {
    axiosFormData(api).then((res: any) => {
      mainStore.setPageList({ djSyzl: res });
    });
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  // getPjsltsData();
  getSyzlData();
  // getFpxslData();
  // getSpajsData();
  getLeftDyrsData();
  getRightNewsData();
});
</script>

<style scoped lang="scss">
.dj-page {
  background: url("@/assets/images/djyl-bg.jpg") no-repeat;
  background-color: #081e34c9;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  font-family: Source Han Sans CN;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0px 60px 60px 60px;

  :deep(.title-circle) {
    background-image: url("@/assets/images/dj-title.png");
    padding-left: 40px;
    box-sizing: border-box;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .dj-top {
    height: 127px;
    width: 100%;
  }
  .dj-content {
    display: flex;
    flex-direction: row;
    height: calc(100% - 32px);
    padding-top: 100px;
    box-sizing: border-box;
  }
}
.back-btn {
  position: fixed;
  bottom: 66px;
  z-index: 999;
  right: 62px;
  color: #ffffff;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  text-align: center;
  width: 36px;
  font-weight: 500;
  background-image: url("@/assets/images/home.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
