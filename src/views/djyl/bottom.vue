<template>
  <div>
    <div class="chart-title"></div>
    <Bar />
  </div>
  <div>
    <div class="chart-title"></div>
    <div ref="lineChartBox" class="pie-chart">
      <div id="lineChartEchart" :style="{ height: lineChartHeight }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { option as lineChartOption } from "./lineChart";
import { noDataOption } from "../daPing/components/noDataOption";
import Bar from "./bar.vue";

const lineChartHeight = ref<string>();
const lineChartBox = ref<ComponentPublicInstance<HTMLDivElement>>();

let myChart: echarts.ECharts;

const getList = (code?: string) => {
  const result2 = {
    code: 200,
    data: [
      { value: 60, name: "在职45岁以下" },
      { value: 52, name: "预备45以下" },
      { value: 46, name: "退休党员" },
    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    result2.data.map((item: any) => {
      names.push(item.name);
      zajq.push(item.value);
    });

    // option.angleAxis.data = names;
    let seriesData = [10, 12, 3, 55, 5, 11];
    let seriesData1 = [1, 12, 4, 3, 16, 50];
    lineChartOption.series[0].data = seriesData;
    lineChartOption.series[1].data = seriesData1;

    if (myChart) myChart.setOption(lineChartOption, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
};
const drawChart = () => {
  if (document.getElementById("lineChartEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("lineChartEchart")!;
      myChart = echarts.init(chartDom);
      myChart.setOption(lineChartOption);
      getList();
      window.onresize = function () {
        if (lineChartBox.value) {
          lineChartHeight.value = `${lineChartBox.value!.offsetHeight}px`;
        }
        myChart.resize();
      };
      window.addEventListener("resize", () => {
        if (lineChartBox.value)
          lineChartHeight.value = `${lineChartBox.value!.offsetHeight}px`;
        if (myChart) {
          myChart.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawChart();
  lineChartHeight.value = `${lineChartBox.value!.offsetHeight - 10}px`;
});
</script>

<style scoped lang="scss">
.chart-title {
  color: #ffffff;
}
.pie-chart {
  width: 400px;
  position: relative;
  height: 262px;
  #lineChartEchart {
    position: absolute;
    left: -10px;
    width: 100%;
    height: 100%;
  }
}
</style>
