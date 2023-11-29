<template plate>
  <div class="dj-right">
    <ModelTitle model-title="荣誉表彰" />

    <div class="content">
      <div v-for="item in flagData?.rongyu" @click="() => flagClickFun(item)">
        {{ item.title }}
      </div>
    </div>

    <ModelTitle model-title="主题党日" />
    <div class="content">
      <div v-for="item in flagData?.zhuti" @click="() => flagClickFun(item)">
        {{ item.title }}
      </div>
    </div>
    <ModelTitle model-title="三会一课" />
    <div class="content">
      <div v-for="item in flagData?.sanhui" @click="() => flagClickFun(item)">
        {{ item.title }}
      </div>
    </div>
  </div>
  <InfoModal
    v-if="isShowModal"
    :show="isShowModal"
    :info-data="infoData"
    @closeModal="closeModal"
  />
</template>

<script setup lang="ts">
import { useMain } from "@/store";
import _ from "lodash";
import InfoModal from "./info-modal.vue";
import ModelTitle from "../daPing/components/modelTitle.vue";

const infoData = ref({});
const mainStore = useMain();
const flagData = ref();
// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    const djNews = state.pageList?.djNews;

    //平均审理天数
    if (JSON.stringify(djNews) != JSON.stringify(flagData.value?.djNews)) {
      flagData.value = djNews;
    }
  },
  { detached: false }
);

const isShowModal = ref<boolean>(false);
const flagClickFun = (item: any) => {
  infoData.value = item;
  isShowModal.value = true;
};
const closeModal = () => {
  isShowModal.value = false;
};
</script>

<style scoped lang="scss">
.dj-right {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(/src/assets/images/card-bg.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 15px 16px 27px 9px;
  box-sizing: border-box;

  width: 420px;
  overflow: hidden;
  .pie-chart {
    width: 400px;
    position: relative;
    height: 262px;
    #pieEchart {
      position: absolute;
      left: -10px;
      width: 100%;
      height: 100%;
    }
  }
  .content {
    min-height: 140px;
    padding: 0 20px;
    box-sizing: border-box;
    div {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #eef6ff;
      padding-top: 18px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
}
</style>
