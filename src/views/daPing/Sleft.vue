<template>
  <div class="cl">
    <div class="aj-box" ref="yjqkBox">
      <ModelTitle model-title="智慧党建" />
      <div class="aj-box-content">
        <div class="aj-box-left">
          <div>党员总人数：<span>78人</span></div>
          <div>储备党员：<span>15人</span></div>
          <div>入党积极分子：<span>10人</span></div>
        </div>
        <div
          id="ajlxEchart"
          class="yjqk-chart"
          :style="{ height: chartHeight }"
        ></div>
      </div>
    </div>

    <Zhsp />
    <Zhzx />
  </div>
</template>

<script setup lang="ts">
import { ComponentPublicInstance } from "vue";
import ModelTitle from "./components/modelTitle.vue";
import * as echarts from "echarts";
import { noDataOption } from "./components/noDataOption";
import { option } from "./components/pieChart";
import Center from "./center.vue";
import Zhsp from "./leftChart/zhsp.vue";
import Zhzx from "./leftChart/zhzx.vue";

const yjqkBox = ref<ComponentPublicInstance<HTMLDivElement>>();
const chartHeight = ref<string>();
let myChart: echarts.ECharts;

/**
 * 获取警情趋势
 * @param code 组织机构code
 */
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
      { value: 4, name: "法庭党支部" },
      { value: 6, name: "法警党支部" },
      { value: 10, name: "机关党支部" },
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
  if (document.getElementById("ajlxEchart")) {
    setTimeout(() => {
      const chartDom = document.getElementById("ajlxEchart")!;
      myChart = echarts.init(chartDom);
      myChart.setOption(option);
      getList();
      window.onresize = function () {
        console.log("yjqkBox.value1", yjqkBox.value);

        if (yjqkBox.value) {
          chartHeight.value = `${yjqkBox.value!.offsetHeight}px`;
        }
        myChart.resize();
      };
      window.addEventListener("resize", () => {
        console.log("yjqkBox.value", yjqkBox.value);
        if (yjqkBox.value)
          chartHeight.value = `${yjqkBox.value!.offsetHeight}px`;
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
  chartHeight.value = `${yjqkBox.value!.offsetHeight - 10}px`;
  console.log(" chartHeight.value ", chartHeight.value);
});
</script>

<style scoped lang="scss">
.cl {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // border: 1px solid yellow;
  background-image: url("@/assets/images/card-bg.png");
  // overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 15px 16px 15px 9px;
  box-sizing: border-box;
}

.aj-box {
  width: 100%;
  height: 228px;
  display: block;
  .aj-box-content {
    margin-left: 7.5px;
    margin-top: 36.5px;
    display: flex;
    flex-direction: row;
    position: relative;
    height: calc(100% - 70px);
    .aj-box-left {
      position: absolute;
      left: 2px;
      // bottom: 10px;
      width: 122px;
      div {
        width: 122px;
        height: 24px;
        line-height: 24px;
        margin-bottom: 12px;
        font-size: 10px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #e9f0fa;
        padding-left: 9px;
        background-image: url("@/assets/images/min-title-bg.png");
        background-position: left;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        span {
          margin-left: 6px;
        }
      }
    }
    .yjqk-chart {
      width: 100%;
      // margin-left: 100px;
      margin-top: -50px;
      position: absolute;
      left: 78px;
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    div {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #44c1ef;
      line-height: 16px;
      text-shadow: 1px 1px 0px rgba(17, 20, 22, 0.22);
      span {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #44c1ef;
        line-height: 16px;
        text-shadow: 1px 1px 0px rgba(17, 20, 22, 0.22);
        margin-left: 20px;
      }
    }
  }
}
</style>
