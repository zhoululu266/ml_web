<template plate>
  <div class="dj-right">
    <ModelTitle model-title="党员年龄" />
    <div ref="pieRightBox" class="pie-chart">
      <div id="pieEchart" :style="{ height: chartHeight }"></div>
    </div>
    <ModelTitle model-title="近五年党员人数" />
    <DyrsBox />
    <ModelTitle model-title="党员学历" />
    <XlBox />
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { noDataOption } from "../daPing/components/noDataOption";
import ModelTitle from "../daPing/components/modelTitle.vue";
import { option } from "./pieChart";
import { lineOption } from "./lineChart";
import XlBox from "./xl.vue";
import DyrsBox from "./dyrs.vue";

const pieRightBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;

const getList = (code?: string) => {
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
    console.log("option.series", option.series);

    option.series[4].data = result2.data;

    if (myChart) myChart.setOption(option, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
  // })
  // .catch(() => {
  //   if (myChart) myChart.setOption(noDataOption, true);
  // });
};
const drawChart = () => {
  if (document.getElementById("pieEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("pieEchart")!;
      myChart = echarts.init(chartDom);
      myChart.setOption(option);
      getList();
      window.onresize = function () {
        console.log("pieRightBox.value1", pieRightBox.value);

        if (pieRightBox.value) {
          chartHeight.value = `${pieRightBox.value!.offsetHeight}px`;
        }
        myChart.resize();
      };
      window.addEventListener("resize", () => {
        console.log("pieRightBox.value", pieRightBox.value);
        if (pieRightBox.value)
          chartHeight.value = `${pieRightBox.value!.offsetHeight}px`;
        if (myChart) {
          myChart.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawChart();
  // getYjListData();
  chartHeight.value = `${pieRightBox.value!.offsetHeight - 10}px`;

  console.log(" chartHeight.value ", chartHeight.value);
});
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
  padding: 15px 16px 15px 9px;
  box-sizing: border-box;
  padding-bottom: 10px;
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
}
</style>
