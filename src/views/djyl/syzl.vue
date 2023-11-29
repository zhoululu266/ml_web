<template>
  <div ref="syzlBox" class="syzl-chart">
    <div id="syzlEchart" :style="{ height: chartHeight }"></div>
  </div>
</template>

<script setup lang="ts">
import { option } from "./pieChartMin";
import { useMain } from "@/store";
import _ from "lodash";
import * as echarts from "echarts";

const chartHeight = ref<string>();
const syzlOption = option;
let syzlChart: echarts.ECharts;
const syzlBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const mainStore = useMain();
const flagData = ref();
// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    const djSyzl = state.pageList?.djSyzl;
    console.log("djSyzlslsubscribe", djSyzl);
    if (JSON.stringify(djSyzl) != JSON.stringify(flagData.value?.djSyzl)) {
      getSyzlList(djSyzl);
    }
  },
  { detached: false }
);
//溯源治理
const getSyzlList = (data: any) => {
  const djSyzl = _.clone(data);
  flagData.value = {
    ...flagData.value,
    djSyzl,
  };
  console.log("syzlOption", syzlOption, syzlOption.series[4]);

  syzlOption.series[4].data = [
    { value: djSyzl?.data || 0, name: (djSyzl?.data || 0) + "个" },
    { value: djSyzl?.anjian || 0, name: djSyzl?.anjian + "个" },
  ];
  console.log("nnn", syzlOption);

  if (syzlChart) syzlChart.setOption(syzlOption, true);
};

const drawChart = () => {
  if (document.getElementById("syzlEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("syzlEchart")!;
      syzlChart = echarts.init(chartDom);
      syzlChart.setOption(syzlOption);
      // getList();
      window.onresize = function () {
        if (syzlBox.value) {
          chartHeight.value = `${syzlBox.value!.offsetHeight}px`;
        }
        syzlChart.resize();
      };
      window.addEventListener("resize", () => {
        if (syzlBox.value)
          chartHeight.value = `${syzlBox.value!.offsetHeight}px`;
        if (syzlChart) {
          syzlChart.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawChart();
  chartHeight.value = `${syzlBox.value!.offsetHeight - 10}px`;
});
</script>

<style scoped lang="scss">
.syzl-chart {
  width: 380px;
  position: relative;
  height: 270px;
  margin-top: 5%;
  #syzlEchart {
    position: absolute;
    left: -8px;
    width: 100%;
    height: 100%;
  }
}
</style>
