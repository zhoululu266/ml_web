<template>
  <div class="right-box">
    <Zhjd />
    <div class="other-box">
      <ModelTitle model-title="智慧管理" type="circle" />
      <div ref="rsBox" class="rs-box">
        <div>
          <div
            id="rsEchart"
            class="rs-chart"
            :style="{ height: chartHeight }"
          ></div>
          <div class="title-p">人事占比</div>
        </div>
        <div>
          <div
            id="rsEchart1"
            class="rs-chart"
            :style="{ height: chartHeight }"
          ></div>
          <div class="title-p">人事占比</div>
        </div>
      </div>
      <zhglBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import Zhjd from "./rightChart/zhjd/index.vue";
import ModelTitle from "./components/modelTitle.vue";
import { dotOption } from "./components/dotChart";
import zhglBar from "./rightChart/zhglBar/index.vue";
import * as echarts from "echarts";

const chartHeight = ref<string>();
let myChart: echarts.ECharts;
let myChart1: echarts.ECharts;
const rsBox = ref<ComponentPublicInstance<HTMLDivElement>>();
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

    // option.angleAxis.data = names;
    console.log("option.series", dotOption.series);

    dotOption.series[0].data = result2.data;

    if (myChart) myChart.setOption(dotOption, true);
    if (myChart1) myChart1.setOption(dotOption, true);
  } else if (myChart) myChart.setOption(noDataOption, true);
  // })
  // .catch(() => {
  //   if (myChart) myChart.setOption(noDataOption, true);
  // });
};

onMounted(() => {
  // drawChart();
  // getYjListData();
  chartHeight.value = `${rsBox.value!.offsetHeight - 10}px`;
  console.log(" chartHeight.value ", chartHeight.value);

  setTimeout(() => {
    const chartDom = document.getElementById("rsEchart")!;
    const chartDom1 = document.getElementById("rsEchart1")!;
    myChart = echarts.init(chartDom);
    myChart1 = echarts.init(chartDom1);
    // // 图例点击方法 点击哪个显示哪个 其他隐藏
    // myChart.on("legendselectchanged", (params: any) => {
    //   const option: any = myChart.getOption();
    //   const select_key = Object.keys(params.selected);

    //   select_key.forEach((res) => {
    //     option.legend[0].selected[res] = !params.selected[res];
    //   });

    //   option.series[0].data = chartObj.value[params.name];

    //   myChart.setOption(option);
    // });
    myChart.setOption(dotOption);
    myChart1.setOption(dotOption);
    getList();
  }, 1000);
});
</script>

<style scoped lan="scss">
.right-box {
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 14px 15px 15px 15px;
  box-sizing: border-box;
  background-image: url("@/assets/images/card-bg.png");
  /* border: 1px solid yellow; */
  /* margin-top: 6%; */
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
