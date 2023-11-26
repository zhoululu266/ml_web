<template>
  <div class="fpxsl-box">
    <div ref="fpxslBox" class="yjqk-chart">
      <div id="fpxslEchart" :style="{ height: chartHeight }"></div>
    </div>
    <div class="fpxsl-right">
      <div class="box blue">
        <span></span>
        <div class="title">党员</div>
        <div class="num">15%</div>
      </div>
      <div class="box yellow">
        <span></span>
        <div class="title">党员</div>
        <div class="num">20%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { option } from "./pieChartFpxsl";
import { useMain } from "@/store";
import _ from "lodash";
import * as echarts from "echarts";

const chartHeight = ref<string>();
const fpxslOption = option;
let fpxslChart: echarts.ECharts;
const fpxslBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const mainStore = useMain();
const flagData = ref();
// 监听数据变化
mainStore.$subscribe(
  (_, state) => {
    const djfpxsl = state.pageList?.djfpxsl;
    console.log("djfpxslsubscribe", djfpxsl);

    if (JSON.stringify(djfpxsl) != JSON.stringify(flagData.value?.djfpxsl)) {
      getfpxslList(djfpxsl);
    }
  },
  { detached: false }
);
//溯源治理
const getfpxslList = (data: any) => {
  const djfpxsl = _.clone(data);
  flagData.value = {
    ...flagData.value,
    djfpxsl,
  };
  console.log("fpxslOption", fpxslOption, fpxslOption.series[4]);

  fpxslOption.series[4].data = [
    { value: 6, name: "15%" },
    { value: 6, name: "30%" },
  ];
  console.log("fpxslOption", fpxslOption);

  if (fpxslChart) fpxslChart.setOption(fpxslOption, true);
};

const drawChart = () => {
  if (document.getElementById("fpxslEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("fpxslEchart")!;
      fpxslChart = echarts.init(chartDom);
      fpxslChart.setOption(fpxslOption);
      // getList();
      window.onresize = function () {
        if (fpxslBox.value) {
          chartHeight.value = `${fpxslBox.value!.offsetHeight}px`;
        }
        fpxslChart.resize();
      };
      window.addEventListener("resize", () => {
        if (fpxslBox.value)
          chartHeight.value = `${fpxslBox.value!.offsetHeight}px`;
        if (fpxslChart) {
          fpxslChart.resize();
        }
      });
    }, 1000);
  }
};
onMounted(() => {
  drawChart();
  chartHeight.value = `${fpxslBox.value!.offsetHeight - 10}px`;
});
</script>

<style scoped lang="scss">
.yjqk-chart {
  width: 380px;
  position: relative;
  height: 272px;
  margin-top: -20px;
  #fpxslEchart {
    position: absolute;
    left: -8px;
    width: 100%;
    height: 100%;
  }
}
.fpxsl-right {
  display: flex;
  flex-direction: column;
  margin-left: -60px;
  margin-right: 40px;
  margin-top: 40px;
  .box {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    span {
      width: 12px;
      height: 12px;
      margin-right: 20px;
    }
    .title {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-right: 20px;
    }
    .num {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      font-style: italic;
      color: #258cff;
    }
  }
  .yellow {
    span {
      background-color: #258cff;
    }
    .num {
      color: #258cff;
    }
  }
  .blue {
    span {
      background-color: #ffea59;
    }
    .num {
      color: #ffea59;
    }
  }
}
.fpxsl-box {
  display: flex;
  flex-direction: row;
}
</style>
