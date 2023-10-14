<template>
  <div ref="dyXlBox" class="dy-xl-chart">
    <div id="dyXlEchart" :style="{ height: xlChartHeight }"></div>
  </div>
</template>

<script setup lang="ts">
import { option } from "./pieChart";
import _ from "lodash";
import * as echarts from "echarts";

const dyXlBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const xlChartHeight = ref<string>();
let xlBarChart: echarts.ECharts;

const xlOption = _.clone(option);
// option.grid.left = "-10%";
const getXlList = (code?: string) => {
  const result = {
    code: 200,
    data: [
      { value: 60, name: "本科" },
      { value: 52, name: "研究生" },
      { value: 46, name: "其他" },
      { value: 30, name: "专科及以下" },
    ],
  };
  if (result.code === 200) {
    const names: any = []; // X轴坐标名称

    result.data.map((item: any) => {
      names.push(item.name);
    });

    xlOption.angleAxis.data = names;

    xlOption.series[4].data = result.data;

    if (xlBarChart) xlBarChart.setOption(xlOption, true);
  } else if (xlBarChart) xlBarChart.setOption(noDataOption, true);
};

const drawXlChart = () => {
  if (document.getElementById("dyXlEchart")) {
    setTimeout(() => {
      const chartBarDom = document.getElementById("dyXlEchart")!;
      xlBarChart = echarts.init(chartBarDom);
      xlBarChart.setOption(xlOption);
      getXlList();
      window.onresize = function () {
        if (dyXlBox.value) {
          xlChartHeight.value = `${dyXlBox.value!.offsetHeight}px`;
        }
        xlBarChart.resize();
      };
      window.addEventListener("resize", () => {
        if (dyXlBox.value)
          xlChartHeight.value = `${dyXlBox.value!.offsetHeight}px`;
        if (xlBarChart) {
          xlBarChart.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawXlChart();
  xlChartHeight.value = `${dyXlBox.value!.offsetHeight - 10}px`;
});
</script>

<style scoped lang="scss">
.dy-xl-chart {
  width: 400px;
  position: relative;
  height: 272px;
  margin-top: -20px;

  #dyXlEchart {
    position: absolute;
    left: -10px;
    width: 100%;
    height: 100%;
  }
}
</style>
