<template>
  <div id="pieEchart" class="pie-chart" :style="{ height: chartHeight }"></div>
</template>

<script setup lang="ts">
import { noDataOption } from "../components/noDataOption";
import * as echarts from "echarts";
import { option } from "../components/pieChart";
import { useMain } from "@/store";

const mainStore = useMain();

const chartHeight = ref<string>("154px");
let myChart: echarts.ECharts;

// 监听数据变化
// mainStore.$subscribe(
//   (_, state) => {
//     getList(state.pageList.zhjd);
//   },
//   { detached: false }
// );
/**
 * 获取警情趋势
 * @param code 组织机构code
 */
const getList = (zhjd: any) => {
  const result2 = {
    code: 200,
    data: [
      { value: 10 || zhjd?.wbry || 0, name: "外部人员过问信息" },
      { value: 20 || zhjd?.nbry || 0, name: "内部人员过问信息" },
      { value: 16 || zhjd?.jcjw || 0, name: "接触交往" },
    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    result2.data.map((item: chartListType) => {
      names.push(item.name);
      zajq.push(item.value);
    });

    option.series[4].data = result2.data;

    if (myChart) myChart.setOption(option, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
};

onMounted(() => {
  setTimeout(() => {
    const chartDom = document.getElementById("pieEchart")!;
    myChart = echarts.init(chartDom);
    myChart.setOption(option);

    getList(mainStore.getPageList()!.zhjd || {});
  }, 1000);
});
</script>

<style scoped></style>
