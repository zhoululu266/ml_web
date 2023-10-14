<template>
  <div
    id="pieEchart1"
    class="pie-chart1"
    :style="{ height: chartHeight }"
  ></div>
</template>

<script setup lang="ts">
import { noDataOption } from "../components/noDataOption";
import * as echarts from "echarts";
import { option } from "../components/pieChart";
import { useMain } from "@/store";

const mainStore = useMain();

// 监听数据变化
// mainStore.$subscribe(
//   (_, state) => {
//     console.log("state", state.pageList);
//     getList(state.pageList?.zhjd);
//   },
//   { detached: false }
// );
const chartHeight = ref<string>("154px");
let myChart: echarts.ECharts;

/**
 * 获取警情趋势
 * @param code 组织机构code
 */
const getList = (zhjd: any) => {
  const result2 = {
    code: 200,
    data: [
      { value: 120 || zhjd?.ajs || 0, name: "案件数" },
      { value: 40 || zhjd?.zb || 0, name: "占比" },
      // { value: 16, name: "机关党支部" },
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

    // option.angleAxis.data = names;

    option.series[4].data = result2.data;

    if (myChart) myChart.setOption(option, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
};

onMounted(() => {
  // drawChart();
  // getYjListData();
  //   chartHeight.value = `${yjqkBox.value!.offsetHeight - 40}px`;

  setTimeout(() => {
    const chartDom = document.getElementById("pieEchart1")!;
    myChart = echarts.init(chartDom);
    myChart.setOption(option);
    getList(mainStore.getPageList()!.zhjd || {});
  }, 1000);
});
</script>

<style scoped></style>
