<template>
  <div class="sxbgl-box">
    <div class="other-box">
      <!-- <div class="center-zb-title"><span></span>审限变更率</div> -->
      <div ref="rsBox" class="rs-box">
        <div ref="ajBarBox" class="yjqk-bar-chart">
          <div id="ajBarEchart" :style="{ height: chartBarHeight }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dotOption } from "./dotChart";
import { noDataOption } from "@/views/daPing/components/noDataOption";
import * as echarts from "echarts";
import { barOption } from "./barChart";
const chartBarHeight = ref<string>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;
const ajBarBox = ref<ComponentPublicInstance<HTMLDivElement>>();
let myBarChart: echarts.ECharts;
const rsBox = ref<ComponentPublicInstance<HTMLDivElement>>();
/**
 * 获取警情趋势
 * @param code 组织机构code
 */
const getList = (code?: string) => {
  const result2 = {
    code: 200,
    data: [
      { value: 10, name: "完成数" },
      { value: 20, name: "未完成数" },
      { value: 16, name: "进行中" },
    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    result2.data.map((item) => {
      names.push(item.name);
      zajq.push(item.value);
    });

    dotOption.series[0].data = result2.data;

    if (myChart) myChart.setOption(dotOption, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
};
const getBarList = (code?: string) => {
  const result2 = {
    code: 200,
    data: [
      { value: 60, name: "法官人均结案数" },
      { value: 52, name: "平均结案天数" },
      { value: 46, name: "上诉案件移动时间" },
    ],
  };
  if (result2.code === 200) {
    const names: any = []; // X轴坐标名称
    const zajq: any = [];

    // eslint-disable-next-line array-callback-return
    let total = 0;
    result2.data.map((item: any) => {
      names.push(item.name);
      zajq.push(item.value);
      total += item.value;
    });
    // result2.data.map((item: any) => {
    //   maxdd.push(total*0.998);
    //   max.push(total);
    //   total += item.value;
    // });
    const max = new Array(3).fill(total);
    const maxdd = new Array(3).fill(total * 0.998);

    barOption.yAxis[0].data = names;

    barOption.series[0].data = zajq;
    barOption.series[1].data = maxdd;
    barOption.series[2].data = max;

    if (myBarChart) myBarChart.setOption(barOption, true);
  } else if (myBarChart) myBarChart.setOption(noDataOption, true);
};
onMounted(() => {
  chartHeight.value = `${rsBox.value!.offsetHeight - 10}px`;

  setTimeout(() => {
    const chartBarDom = document.getElementById("ajBarEchart")!;
    myBarChart = echarts.init(chartBarDom);
    myBarChart.setOption(barOption);
    getBarList();

    window.onresize = function () {
      if (ajBarBox.value) {
        chartBarHeight.value = `${ajBarBox.value!.offsetHeight}px`;
      }
      myBarChart.resize();
    };
    window.addEventListener("resize", () => {
      if (ajBox.value)
        chartBarHeight.value = `${ajBarBox.value!.offsetHeight}px`;
      if (myBarChart) {
        myBarChart.resize();
      }
    });
    getList();
  }, 1000);
});
</script>

<style scoped lan="scss">
.sxbgl-box {
  color: #fff;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 14px 15px 15px 15px;
  box-sizing: border-box;
  .yjqk-bar-chart {
    width: 100%;
    position: relative;
    height: 272px;
    left: -30px;
    #ajBarEchart {
      position: absolute;
      left: -8px;
      width: 100%;
      height: 100%;
    }
  }
  .center-zb-title {
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;

    span {
      width: 6px;
      height: 19px;
      display: inline-block;
      margin-right: 13px;
      background: #48bdf4;
    }
  }
}

.rs-box {
  width: 100%;
  height: 160px;
  display: flex;
  flex-direction: row;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title-p {
    font-size: 9px;
    transform: scale(0.8);
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #f0f0f0;

    margin-top: -15px;
  }

  .rs-chart {
    margin-top: 20px;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100px 100px;

    background-image: url("@/assets/images/dot-bg.png");
  }
}
</style>
