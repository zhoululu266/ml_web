<!-- 近五年党员人数 -->
<template>
  <div ref="dyDyrsBox" class="dy-dyrs-chart">
    <div id="dyDyrsEchart" :style="{ height: xlChartHeight }"></div>
  </div>
</template>

<script setup lang="ts">
import { lineOption } from "./lineChart";
import _ from "lodash";
import * as echarts from "echarts";

const dyDyrsBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const xlChartHeight = ref<string>();
let xlBarChart: echarts.ECharts;

const xlOption = _.clone(lineOption);
// option.grid.left = "-10%";
const getDyrsList = (code?: string) => {
  //   const url = `${$config.patrolApi}/statisticsManage/jqOverview`;
  //   const params = {
  //     orgCode: code,
  //     // startTime: "2022-01-01 00:00:00",
  //     // endTime: "2022-12-30 23:59:59",
  //     startTime: `${times.startTime} 00:00:00`,
  //     endTime: `${times.endTime} 23:59:59`,
  //   };
  //   axiosPost(url, params)
  //     .then((result2) => {
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
    // 获取当前年份
    const currentYear = new Date().getFullYear();

    // 使用 Array.from() 和扩展运算符生成年份数组
    const years = Array.from(
      { length: 5 },
      (_, index) => currentYear - index
    ).reverse();

    xlOption.xAxis.data = years;
    xlOption.series[0].data = [60, 90, 50, 70, 60];
    xlOption.series[1].data = [60, 90, 50, 70, 60];

    if (xlBarChart) xlBarChart.setOption(xlOption, true);
  } else if (xlBarChart) xlBarChart.setOption(noDataOption, true);
  // })
  // .catch(() => {
  //   if (myChart) myChart.setOption(noDataOption, true);
  // });
};

const drawDyrsChart = () => {
  if (document.getElementById("dyDyrsEchart")) {
    setTimeout(() => {
      const chartBarDom = document.getElementById("dyDyrsEchart")!;
      xlBarChart = echarts.init(chartBarDom);
      xlBarChart.setOption(xlOption);
      getDyrsList();
      window.onresize = function () {
        console.log("dyDyrsBox.value1", dyDyrsBox.value);

        if (dyDyrsBox.value) {
          xlChartHeight.value = `${dyDyrsBox.value!.offsetHeight}px`;
        }
        xlBarChart.resize();
      };
      window.addEventListener("resize", () => {
        console.log("dyDyrsBox.value", dyDyrsBox.value);
        if (dyDyrsBox.value)
          xlChartHeight.value = `${dyDyrsBox.value!.offsetHeight}px`;
        if (xlBarChart) {
          xlBarChart.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawDyrsChart();
  xlChartHeight.value = `${dyDyrsBox.value!.offsetHeight - 10}px`;
});
</script>

<style scoped lang="scss">
.dy-dyrs-chart {
  width: 400px;
  position: relative;
  height: 272px;
  margin-bottom: -34px;

  #dyDyrsEchart {
    position: absolute;
    // left: -30px;
    width: 100%;
    height: 100%;
  }
}
</style>
