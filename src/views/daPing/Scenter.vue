<template>
  <div class="s-center-box">
    <div class="mainItem">
      <jgmap
        @hierarchyName="getTitle"
        @showSelectTitle="showSelectTitle"
        @selectData="getSelectData"
        @changeShowFun="changeShowFun"
        flag="Scenter"
      />
    </div>
    <div class="mainItemor">
      <ModelTitle model-title="申请案件信息" />
      <ScrollTable
        :columns="columns"
        :tableData="tableData"
        :indexSet="{ label: ' ' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import jgmap from "./tabAndMap/jgmap.vue";
import ScrollTable from "./components/scrollTable.vue";
import moment from "moment";
import ModelTitle from "./components/modelTitle.vue";
import { useMain } from "@/store";

const mainStore = useMain();

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

const columns = ref([
  { prop: "case_number", label: "案件号", width: "140" },
  { prop: "client_name", label: "申请人姓名", width: "80" },
  { prop: "area_name", label: "纠纷发生地", class: "yichang", width: "180" },
  { prop: "case_type", label: "案件类型", width: "200" },

  { prop: "content", label: "申请内容" },
]);
const tableData = ref(
  new Array(11).fill({
    case_number: "张玲立",
    case_type: "刑事案件",
    area_name: "2023-06-30 14:20",
    content: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
);
// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    if (tableData.value != state.pageList?.sqajxx) {
      tableData.value = state.pageList?.sqajxx;
    }
  },
  { detached: false }
);
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
.s-center-box {
  /* display: grid; */
  /* grid-template-rows: 2fr 1fr; */
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
    padding: 0 2%;
    box-sizing: border-box;
    width: 100%;
    .title-circle {
      background-size: 40% 100%;
      background-position: left;
    }
  }
}
.flex-bottom {
  height: calc(100% - 100px);
  margin-top: 23px;
}
</style>
