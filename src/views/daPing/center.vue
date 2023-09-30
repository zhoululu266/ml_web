<template>
  <div class="center-box">
    <div class="mainItem">
      <jgmap
        @hierarchyName="getTitle"
        @showSelectTitle="showSelectTitle"
        @selectData="getSelectData"
        @changeShowFun="changeShowFun"
      />
    </div>
    <div class="mainItemor">
      <Flgwzfs />
    </div>
  </div>
</template>

<script setup lang="ts">
import jgmap from "./tabAndMap/jgmap.vue";
import Flgwzfs from "./flgwzfs/index.vue";
import moment from "moment";
const emit = defineEmits(["changeShow"]);
const changeShowFun = () => {
  emit("changeShow");
};

interface timeType {
  startTime: string;
  endTime: string;
}
const title = ref<string>(""); // 巡防力量 title
const selectTitle = ref<string>(""); // 事件处理 动态title
const selectValue = ref<string>(); // 下拉框model
const isSelect = ref<boolean>(false);
const selectData = ref<any>([]);
const tabRef = ref();
const showTab = ref<boolean>(true);

const getTitle = (data: string) => {
  title.value = data;
  selectTitle.value = data;
};

const showSelectTitle = (val: boolean) => {
  isSelect.value = val;
};

const showTabChange = (data: boolean) => {
  showTab.value = data;
};

/**
 * 下拉框赋值
 * @param data 下拉框数据
 */
const getSelectData = (data: any) => {
  selectValue.value = "";
  selectData.value = JSON.parse(
    JSON.stringify(data)
      .replace(/name/g, "label")
      .replace(/id/g, "value")
      .replace(/children/g, "childrens")
  );
};

const tabSwitch = ref<string>("xfll");
// const useTab = tspHead();
// const main = useMain();
const sjczTime1 = ref<timeType>({
  endTime: moment().format("YYYY-MM-DD"),
  startTime: moment().format("YYYY-MM-DD"),
});

/** 轮询时间 */
const interval = ref(60 * 1000);

const { pause, resume } = useIntervalFn(() => {
  tspPolling();
}, interval);

onMounted(() => {
  // timer.value = setInterval(tspPolling, 60000);
  resume();
});

const closeDateModel = () => {
  tabRef.value && tabRef.value.close();
};

const tspPolling = () => {
  const time = moment().format("YYYY-MM-DD HH:mm:ss");
  //   useTab.setpollingTime(time);
};

// 事件处置手动改变时间 清除定时器重新定时轮询
// useTab.$subscribe(
//   (mutation, state) => {
//     if (state.sjczTime !== sjczTime1.value) {
//       sjczTime1.value = state.sjczTime;
//       // clearInterval(timer.value);
//       pause();
//       resume();
//       // timer.value = setInterval(tspPolling, 60000);
//     }
//   },
//   { detached: false }
// );
onBeforeUnmount(() => {
  // clearInterval(timer.value);
  pause();
  //   useTab.setpollingTime("");
});
</script>

<style scoped lan="lass">
.center-box {
  position: relative;
  row-gap: 20px;
  .mainItem {
    height: calc(100% - 210px);
    width: 100%;
    padding-left: 3%;
    box-sizing: border-box;
  }
  .mainItemor {
    position: absolute;
    bottom: -32px;
    height: 280px;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
